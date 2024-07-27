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
import { Error, Input1, showToast } from '../../Screens/Universal/Input';
import { Formik } from 'formik';
import { Dropdown } from 'react-native-element-dropdown';
import * as Yup from 'yup';
import Screensheader from '../../Screens/Universal//Screensheader';
import storage from '@react-native-firebase/storage';
import { ref1, app, db } from '../../Firebase';
import {
    doc,
    updateDoc,
} from 'firebase/firestore';

import FilePicker from 'react-native-document-picker';
import uuid from 'react-native-uuid';
import { getAuth } from 'firebase/auth';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Buttonnormal } from '../../Screens/Universal/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Sessions = ({ navigation, }) => {
    // const { url, pname,pid } = route.params;

    const [loading, setloading] = useState(false);

    //for image
    const [imglink1, setimglink1] = useState(null);
    const [name1, setimgname1] = useState(null);
    const [type1, setimgtype1] = useState(null);
    const [filedata1, setfiledata1] = useState("https://firebasestorage.googleapis.com/v0/b/supplysync-3e4b1.appspot.com/o/allfiles%2Fimages.jpg?alt=media&token=0aa9155e-5ebd-4b22-8f77-c9d70d280507");
    const [user, setuser] = useState(null); 

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const userid = uuid.v4();

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];



    const Validation = Yup.object().shape({
        name: Yup.string().required('Must be filled'),
    });

    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem('email').then((email) => {
                setuser(email);
            });
            return () => {

            };
        }, [])

    );

    const choosefileimg = async () => {
        try {
            const res = await FilePicker.pickSingle({
                presentationStyle: 'overFullScreen',
                copyTo: 'cachesDirectory',
                type: [FilePicker.types.images],
            });
            // if (res.size / 1000 / 1000 <= 5.0) {
            setfiledata1(res.uri);
            console.log(res.size / 1000 / 1000);
            console.log(res.uri);
            const path = res.fileCopyUri.replace('file://', '');
            setimglink1(path);
            setimgname1(res.name);
            setimgtype1(res.type);
        } catch (error) {
            if (FilePicker.isCancel(error)) {
                console.log('user cancel the pick file');
            } else {
                console.log('errror', error);
            }
        }
    };




    const uploadupdatefile = async (productname) => {
        if (imglink1) {

            setloading(true);
            const reference = storage().ref(`allfiles/${name1}`);
            await reference.putFile(imglink1);
            const url = await storage().ref(`allfiles/${name1}`).getDownloadURL();
            console.log('your file is locating :', url);
            Signinwithemailandpass(productname, url);
        }
        else {

            Alert.alert('Please select a file to upload');

        }
    };

    const Signinwithemailandpass = async (productname, url) => {
        if (!email || !password || !productname) {
            showToast("error", "Field Required", "Must Fill All The Field", true, 1000)
        }

        else {
            //   setloading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then(data => {
                    console.log(data.user.email);

                    setDoc(doc(db, 'Signup', userid), {
                        fullname: name,
                        role: 'user',
                        email: email.toLowerCase(),
                        password,
                        userid,
                        timestamp: serverTimestamp(),
                    })
                        .then(() => {
                            console.log('done');

                            setDoc(doc(db, 'Profile', userid), {
                                fullname: name,
                                email: email.toLowerCase(),
                                profilephoto: url,
                                role: 'user',
                                userid,
                                timestamp: serverTimestamp(),
                            })
                                .then(() => {
                                    setloading(false)
                                    Alert.alert('Congratulation', 'User Has Been Register', [
                                        {
                                            text: 'OK',
                                            onPress: () => navigation.navigate('Login'),
                                        },
                                    ]);
                                })
                                .catch(error => {
                                    setloading(false)
                                    // console.log(error);
                                    Alert.alert('this :', error.message);
                                });
                        })
                        .catch(error => {
                            setloading(false)
                            // console.log(error);
                            Alert.alert('this :', error.message);
                        });
                })
                .catch(error => {
                    setloading(false)
                    // console.log("this : ",error.message);
                    Alert.alert('this :', error.message);
                });
        }
    };


    return (
        <>

            <>
                <View style={[tw`flex-1 flex`, { backgroundColor: '#FFFFFF' }]}>
                    <>
                        <Formik
                            initialValues={{
                                name: ""
                            }}
                            validationSchema={Validation}
                            onSubmit={(values, { resetForm }) => {

                                uploadupdatefile(
                                    values.name
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
                                                name={'ADD DOCTOR'}
                                                left={15}
                                                onPress={() => navigation.goBack()}
                                            />



                                            <View
                                                style={tw`flex flex-col w-80 self-center justify-around`}>
                                                <TouchableOpacity onPress={() => choosefileimg()}>
                                                    <View
                                                        style={tw`flex w-80  items-center  mt-5 flex-col`}>
                                                        <View
                                                            style={tw`  h-30 border-2 rounded-full w-30 items-center border-dotted`}>

                                                            <Image
                                                                source={{ uri: filedata1 }}
                                                                resizeMode='cover'
                                                                style={tw` w-29 h-29 rounded-full`}
                                                            />

                                                        </View>
                                                        <View style={tw`mt-2 items-center`}>
                                                            <Text style={tw`font-bold  `}>
                                                                Add Profile Image
                                                            </Text>
                                                            <Text style={tw`text-xs  `}>Max 5mb</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={tw` self-center  h-70`}>
                                                <View style={tw`top-5`}>
                                                    <Input1
                                                        placeholder="Add Doctor Name"
                                                        onchangetext={handleChange('name')}
                                                        onblur={handleBlur('name')}
                                                        value={values.name}
                                                        error={touched.name ? errors.name : false}
                                                    />
                                                </View>


                                                <View style={tw`top-5`}>
                                                    <Input1
                                                        placeholder="Add Doctor Designation"
                                                        onchangetext={handleChange('name')}
                                                        onblur={handleBlur('name')}
                                                        value={values.name}
                                                        error={touched.name ? errors.name : false}
                                                    />
                                                </View>

                                                {/* 
                                              <View style={tw`top-5`}>
                                                  <Input1
                                                      placeholder="Add Doctor Email"
                                                      onchangetext={handleChange('name')}
                                                      onblur={handleBlur('name')}
                                                      value={values.name}
                                                      error={touched.name ? errors.name : false}
                                                  />
                                              </View> */}


                                                <View style={tw`top-5`}>
                                                    <Input1
                                                        placeholder="Add Doctor Phone"
                                                        onchangetext={handleChange('name')}
                                                        onblur={handleBlur('name')}
                                                        value={values.name}
                                                        error={touched.name ? errors.name : false}
                                                    />
                                                </View>



                                                <View style={tw`top-5`}>
                                                    <Dropdown
                                                        style={[tw`h-12 w-80  mt-5 bg-gray-100 rounded-md`,{ backgroundColor: "#EEEEEE" }]}
                                                        placeholderStyle={tw`ml-3 text-gray-400 text-xs `}
                                                        selectedTextStyle={tw`ml-3 text-gray-200  `}
                                                        containerStyle={tw`h-80 w-80  mt-7 bg-gray-100 rounded-md`}

                                                        data={data}
                                                        maxHeight={300}
                                                        labelField="label"
                                                        valueField="value"
                                                        placeholder={'Select Doctor Days'}
                                                        mode='modal'
                                                    
                                                        value={value}
                                                        onFocus={() => setIsFocus(true)}
                                                        onBlur={() => setIsFocus(false)}
                                                        onChange={item => {
                                                            setValue(item.value);
                                                            setIsFocus(false);
                                                        }}

                                                    />
                                                </View>



                                                <View style={tw`top-5`}>
                                                    <Input1
                                                        placeholder="Add Doctor Timing"
                                                        onchangetext={handleChange('name')}
                                                        onblur={handleBlur('name')}
                                                        value={values.name}
                                                        error={touched.name ? errors.name : false}
                                                    />
                                                </View>





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
                                                                c1={'#0B4064'}
                                                                c2={'#0B4064'}
                                                                style={tw`text-white`}
                                                                title={"ADD DOCTOR"}
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

export default Sessions;

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
