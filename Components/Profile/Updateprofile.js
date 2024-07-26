import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import React, { useEffect, useState, useCallback, useContext } from 'react';
import tw from 'twrnc';
import { Error, Input, Input1, showToast } from '../../Screens/Universal/Input';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Screensheader from '../../Screens/Universal/Screensheader';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Buttonnormal } from '../../Screens/Universal/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Updateprofile = ({ navigation, route }) => {
    const { fname, lname, email } = route.params;

    const [loading, setloading] = useState(false);
    const [user, setuser] = useState("");


    const Validation = Yup.object().shape({
        fname: Yup.string().required('Must be filled'),
        lname: Yup.string().required('Must be filled'),
        email: Yup.string().required('Must be filled'),

    });

    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem('token').then((token) => {
                setuser(token);
            });
            return () => {

            };
        }, [])

    );


    const updateprofile = async (fname, lname, email) => {

        const formData = new FormData();
        formData.append('first_name', fname);
        formData.append('last_name', lname);
        formData.append('email', email);

        try {
            setloading(true)
            const response = await fetch('https://vr.evolvsolution.com/api/update-profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user}`, // Replace YOUR_TOKEN_HERE with the actual token
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                setloading(false)
                console.log('Signup successful:', result);
                // navigation.navigate('Subplan')
                console.log("token :", result.data.token);
                navigation.navigate("Profile")

            } else {

                setloading(false)
                showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
                // console.error('Signup failed:', result);

            }
        } catch (error) {
            setloading(false)
            showToast("error", "Error", error, true, 3000);
            console.error('Catch Error:', error)
        }
    };



    return (
        <>

            <>
                <View style={[tw`flex-1 flex`, { backgroundColor: '#FFFFFF' }]}>
                    <>
                        <Formik
                            initialValues={{
                                fname: fname,
                                lname: lname,
                                email: email
                            }}
                            validationSchema={Validation}
                            onSubmit={(values, { resetForm }) => {

                                updateprofile(
                                    values.fname,
                                    values.lname,
                                    values.email
                                )


                            }}>
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                errors,
                                touched,
                                values,
                                isValid,
                            }) => (
                                <SafeAreaView>
                                    <ScrollView vertical showsVerticalScrollIndicator={true}>
                                        <View style={tw`h-180`}>
                                            <Screensheader
                                                name={'Update Your Profile'}
                                                left={10}
                                                onPress={() => navigation.goBack()}
                                            />





                                            <View style={tw` self-center mt-20 h-70`}>


                                                <Input
                                                    onchangetext={handleChange('fname')}
                                                    onblur={handleBlur('fname')}
                                                    value={values.fname}
                                                    source={require("../../Images/user.png")}
                                                    placeholder={errors.fname ? errors.fname : "Your First Name"}
                                                />

                                                <Input
                                                    onchangetext={handleChange('lname')}
                                                    onblur={handleBlur('lname')}
                                                    value={values.lname}
                                                    source={require("../../Images/user.png")}
                                                    placeholder={errors.lname ? errors.lname : "Your Last Name"}
                                                />

                                                <Input
                                                    onchangetext={handleChange('email')}
                                                    onblur={handleBlur('email')}
                                                    value={values.email}
                                                    source={require("../../Images/mail.png")}
                                                    placeholder={errors.email ? errors.email : "Enter Your Email"}
                                                />



                                                {
                                                    loading ?
                                                        <ActivityIndicator
                                                            style={tw`mt-10 `}
                                                            size="large"
                                                            color="#199A8E"
                                                        />
                                                        :
                                                        <View style={tw`mt-10`}>
                                                            <Buttonnormal
                                                                onPress={handleSubmit}
                                                                c1={'#199A8E'}
                                                                c2={'#199A8E'}
                                                                style={tw`text-white`}
                                                                title={"UPDATE PROFILE"}
                                                            />
                                                        </View>

                                                }



                                            </View>
                                        </View>
                                    </ScrollView>
                                </SafeAreaView>
                            )}
                        </Formik>
                    </>
                </View>
                <Toast />
            </>

        </>
    );
};

export default Updateprofile;

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
