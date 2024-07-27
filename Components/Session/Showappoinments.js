import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { showToast } from '../../Screens/Universal/Screensheader';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screensheader from '../../Screens/Universal/Screensheader';
import { Buttonnormal } from '../../Screens/Universal/Buttons';
// import LinearGradient from 'react-native-linear-gradient'

const Showappointments = ({ navigation }) => {

    const [name, setname] = useState("");
    const [device, setdevice] = useState([]);
    const [session, setsession] = useState("");
    const [price, setprice] = useState("");
    const [cat, setcat] = useState("All")


    const vrImages = [
        {
            url: "https://vection-cms-prod.s3.eu-central-1.amazonaws.com/Adobe_Stock_506941973_cc825880a8.jpeg",
            text: "All"
        },
        {
            url: "https://images.inc.com/uploaded_files/image/1920x1080/getty_921019710_413686.jpg",
            text: "Cancelled"
        },

    ];






    return (
        <View style={tw` bg-white flex-1`}>
            <Screensheader
                name={'APPOINMENTS'}
                left={15}
                onPress={() => navigation.goBack()}
            />

            <View
                style={tw`w-85 h-12   flex-row  self-center  items-center`}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* card 1 */}

                    <>


                        {vrImages?.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    // setloading(true)
                                    // getcatvideo(item.id)
                                    setcat(item.text)
                                }}>
                                <View style={[tw`bg-${cat === item.text ? 'blue-400' : 'white'} h-10 w-30 ml-10 border flex-row items-center justify-evenly rounded-3xl`, { borderRadius: 50, borderColor: '#00B1E7' }]}>
                                    <Image style={tw`h-5 w-5 rounded-full`} source={{ uri: item.url }} />
                                    <Text numberOfLines={1} style={tw`text-center text-${cat === item.text ? "white" : "black"} w-18`}>{item.text}</Text>
                                </View>
                            </TouchableOpacity>

                        ))
                        }




                    </>


                </ScrollView>
            </View>

            <ScrollView style={tw`flex-1 mb-5 self-center `} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Showappoinments")
                    }}
                >
                    <View style={[tw`border flex-col justify-center items-center w-80 h-50 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>

                        <View style={tw`h-15 w-70 flex-row items-center justify-between `}>

                            <View>
                                <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                                <Text numberOfLines={1} style={tw`font-light  w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                            </View>

                            <Image
                                style={tw`h-15 w-15 rounded-full`}
                                resizeMode='cover'
                                source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                            />
                        </View>

                        <View style={tw`h-10  justify-around items-center flex-row w-75`}>
                            <Text numberOfLines={1} style={tw`font-normal  text-base`}>2024/06/27</Text>
                            <Text numberOfLines={1} style={tw`font-normal   text-sm`}>10:20</Text>
                            <Text numberOfLines={1} style={tw`font-normal text-green-500   text-base`}>Confirmed</Text>


                        </View>
                        <TouchableOpacity>
                            <View style={tw` rounded-md bg-slate-200 w-70 items-center justify-center h-10 mt-5 `}>

                                <Text>
                                    CANCEL
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Showappoinments")
                    }}
                >
                    <View style={[tw`border flex-col justify-center items-center w-80 h-50 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>

                        <View style={tw`h-15 w-70 flex-row items-center justify-between `}>

                            <View>
                                <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                                <Text numberOfLines={1} style={tw`font-light  w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                            </View>

                            <Image
                                style={tw`h-15 w-15 rounded-full`}
                                resizeMode='cover'
                                source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                            />
                        </View>

                        <View style={tw`h-10  justify-around items-center flex-row w-75`}>
                            <Text numberOfLines={1} style={tw`font-normal  text-base`}>2024/06/27</Text>
                            <Text numberOfLines={1} style={tw`font-normal   text-sm`}>10:20</Text>
                            <Text numberOfLines={1} style={tw`font-normal text-green-500   text-base`}>Confirmed</Text>


                        </View>

                        <View style={tw` rounded-md bg-slate-200 w-70 items-center justify-center h-10 mt-5 `}>
                            <TouchableOpacity>
                                <Text>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                </TouchableOpacity>



                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Showappoinments")
                    }}
                >
                    <View style={[tw`border flex-col justify-center items-center w-80 h-50 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>

                        <View style={tw`h-15 w-70 flex-row items-center justify-between `}>

                            <View>
                                <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                                <Text numberOfLines={1} style={tw`font-light  w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                            </View>

                            <Image
                                style={tw`h-15 w-15 rounded-full`}
                                resizeMode='cover'
                                source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                            />
                        </View>

                        <View style={tw`h-10  justify-around items-center flex-row w-75`}>
                            <Text numberOfLines={1} style={tw`font-normal  text-base`}>2024/06/27</Text>
                            <Text numberOfLines={1} style={tw`font-normal   text-sm`}>10:20</Text>
                            <Text numberOfLines={1} style={tw`font-normal text-green-500   text-base`}>Confirmed</Text>


                        </View>

                        <View style={tw` rounded-md bg-slate-200 w-70 items-center justify-center h-10 mt-5 `}>
                            <TouchableOpacity>
                                <Text>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                </TouchableOpacity>




                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Showappoinments")
                    }}
                >
                    <View style={[tw`border flex-col justify-center items-center w-80 h-50 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>

                        <View style={tw`h-15 w-70 flex-row items-center justify-between `}>

                            <View>
                                <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                                <Text numberOfLines={1} style={tw`font-light  w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                            </View>

                            <Image
                                style={tw`h-15 w-15 rounded-full`}
                                resizeMode='cover'
                                source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                            />
                        </View>

                        <View style={tw`h-10  justify-around items-center flex-row w-75`}>
                            <Text numberOfLines={1} style={tw`font-normal  text-base`}>2024/06/27</Text>
                            <Text numberOfLines={1} style={tw`font-normal   text-sm`}>10:20</Text>
                            <Text numberOfLines={1} style={tw`font-normal text-green-500   text-base`}>Confirmed</Text>


                        </View>

                        <View style={tw` rounded-md bg-slate-200 w-70 items-center justify-center h-10 mt-5 `}>
                            <TouchableOpacity>
                                <Text>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                </TouchableOpacity>



                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Showappoinments")
                    }}
                >
                    <View style={[tw`border flex-col justify-center items-center w-80 h-50 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>

                        <View style={tw`h-15 w-70 flex-row items-center justify-between `}>

                            <View>
                                <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                                <Text numberOfLines={1} style={tw`font-light  w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                            </View>

                            <Image
                                style={tw`h-15 w-15 rounded-full`}
                                resizeMode='cover'
                                source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                            />
                        </View>

                        <View style={tw`h-10  justify-around items-center flex-row w-75`}>
                            <Text numberOfLines={1} style={tw`font-normal  text-base`}>2024/06/27</Text>
                            <Text numberOfLines={1} style={tw`font-normal   text-sm`}>10:20</Text>
                            <Text numberOfLines={1} style={tw`font-normal text-green-500   text-base`}>Confirmed</Text>


                        </View>

                        <View style={tw` rounded-md bg-slate-200 w-70 items-center justify-center h-10 mt-5 `}>
                            <TouchableOpacity>
                                <Text>
                                    CANCEL
                                </Text>
                            </TouchableOpacity>



                        </View>
                    </View>
                </TouchableOpacity>




            </ScrollView>
        </View>
    )
}

export default Showappointments