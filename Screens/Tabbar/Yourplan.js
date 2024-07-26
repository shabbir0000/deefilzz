import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { showToast } from '../Universal/Input';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient'

const Yourplan = ({ navigation }) => {

    const [name, setname] = useState("");
    const [device, setdevice] = useState([]);
    const [session, setsession] = useState("");
    const [price, setprice] = useState("");

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
                console.log("result :", result.data.subscription);
                setname(result.data.subscription.name)
                setprice(result.data.subscription.price)
                const detail = result.data.subscription.details
                const final = JSON.parse(detail)
                // console.log("devices :",final[0]);
                setdevice(final)
                // setsession(final[1])





            } else {

                showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
            }
        } catch (error) {

            showToast("error", "Error", error, true, 3000);
            console.error('Catch Error:', error);
        }
    };


    return (
        <View style={tw` bg-white flex-1`}>
            <>
                <View style={tw`justify-start mt-15 w-80 h-10 items-center self-center`}   >
                    <Text style={[tw`text-left  font-bold text-2xl`, { color: '#199A8E' }]}>
                        YOUR SUBSCRIBE PLAN
                    </Text>
                </View>
                <View
                    style={tw`w-85 h-130 flex  flex-row  self-center rounded-xl items-center`}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {/* card 1 */}

                        <>




                            <View style={[tw`h-120 border w-75 ml-5 rounded-lg  `, { borderTopLeftRadius: 50, borderBottomRightRadius: 50, borderColor: '#199A8E' }]}>

                                <View style={[tw` h-30 w-35 items-center justify-center `, { borderTopLeftRadius: 50, borderBottomRightRadius: 50, backgroundColor: '#199A8E' }]}>
                                    <Text style={[tw`text-white font-medium text-lg`]}>
                                        {name}
                                    </Text>
                                </View>

                                <View style={tw`items-center mt-5 justify-center`}>
                                    <Text style={tw`text-3xl`}>
                                        {price}$
                                    </Text>

                                    <View style={tw`w-60 flex-col h-55 justify-evenly items-center self-center`}>

                                        {
                                            device.map((data,index)  => (
                                                <View key={index} style={tw`flex-row w-55`}>
                                                    <Image
                                                        style={tw`h-5 w-5 `}
                                                        source={require("../../Images/checked.png")}
                                                    />
                                                    <Text style={tw`text-gray-400`}> {data}</Text>
                                                </View>
                                            ))
                                        }

                                    </View>

                                    <TouchableOpacity
                                        disabled={true}
                                    >
                                        <View style={[tw`items-center w-35 h-10 rounded-3xl justify-center `, { backgroundColor: '#199A8E' }]}>
                                            <Text style={tw`text-white text-center`}>SUBSCRIBED</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>




                        </>


                    </ScrollView>
                    <Toast />
                </View>
            </>
        </View>
    )
}

export default Yourplan