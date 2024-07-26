import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { showToast } from '../../Screens/Universal/Input';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Showbalance = () => {

    const [name, setname] = useState([]);


    useFocusEffect(
        React.useCallback(() => {
            const checkUserRole = async () => {
                AsyncStorage.getItem("token").then((token) => {
                    getinfo(token)

                })
            };
            checkUserRole();
            return () => { };
        }, []) // Empty dependency array ensures this runs only on focus and cleanup on blur
    );


    const getinfo = async (token) => {

        try {

            const response = await fetch('https://vr.evolvsolution.com/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Replace YOUR_TOKEN_HERE with the actual token
                },
            });

            const result = await response.json();
            if (response.ok) {

                console.log('Request successful:', result);
                // navigation.navigate('Subplan')
                console.log("result :", result.data.subscription.details);
                //  setname(result.data.subscription.details)
                const extractValue = (array, keyword) => {
                    const item = array.find(element => element.includes(keyword));
                    return item ? item.split(' ')[0] : null;
                  };
                
                  const handleDataExtraction = () => {
                    const dataArray = JSON.parse(result.data.subscription.details);
                    const sessionValue = extractValue(dataArray, 'session');
                    console.log('Session Value:', sessionValue);
                    setname(sessionValue)
                  };

                  handleDataExtraction()

            } else {

                showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
            }
        } catch (error) {

            showToast("error", "Error", error, true, 3000);
            console.error('Catch Error:', error);
        }
    };


    return (
        <>
            <LinearGradient colors={['#199A8E', '#00a897']} style={tw`top-10 flex flex-row items-center justify-center self-center h-25 w-85 rounded-xl`} >



                {/* // balance dev */}
                <View  >
                    <Text style={tw`text-xl   text-gray-300`}>
                        {"Your Sessions"}
                    </Text>
                    <Text style={tw`text-4xl text-center  font-bold text-white`}>
                        {name}
                    </Text>
                </View>


                {/* graph  */}
                <View style={tw` h-20 w-40 left-5 justify-center self-center items-center rounded-md`}>
                    <Image
                        style={tw`h-19 w-39 rounded-lg `}
                        source={require("../../Images/homepic.jpg")}
                    />
                </View>


            </LinearGradient>
            <Toast />



        </>
    )
}

export default Showbalance