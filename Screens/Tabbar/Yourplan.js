import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { showToast } from '../Universal/Input';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screensheader from '../Universal/Screensheader';
// import LinearGradient from 'react-native-linear-gradient'

const Yourplan = ({ navigation }) => {

    const [name, setname] = useState("");
    const [device, setdevice] = useState([]);
    const [session, setsession] = useState("");
    const [price, setprice] = useState("");
    const [cat,setcat] = useState ("All Doc")


    const vrImages = [
        {
          url: "https://vection-cms-prod.s3.eu-central-1.amazonaws.com/Adobe_Stock_506941973_cc825880a8.jpeg",
          text: "cardio"
        },
        {
          url: "https://images.inc.com/uploaded_files/image/1920x1080/getty_921019710_413686.jpg",
          text: "physio"
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxppOK6lXDXS0sAPzkkXzgeEvERi9EwdBre_AcvFHkX1kwufIiS1qFpDCiDsKKcWkdrwQ&usqp=CAU",
          text: "general doc"
        },
        {
          url: "https://imageio.forbes.com/specials-images/imageserve/5f239af66507ee97a5379ffa/These-3-Business-Functions-Could-Be-Transformed-By-VR/960x0.jpg?height=474&width=711&fit=bounds",
          text: "gynoligist"
        },
        {
          url: "https://jacoblund.com/cdn/shop/products/photo-id-2000512876613-business-team-using-virtual-reality-headset-in-meeting_1200x800.jpg?v=1563897567",
          text: "neuro"
        },
        {
          url: "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL1ZSLXVzZXMuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0=",
          text: "orthpedic"
        },
        {
          url: "https://www.glueup.com/storage/app/uploads/public/5f3/65e/8ea/5f365e8ea741c038111951.jpg",
          text: "eyes"
        }
      ];
      





    return (
        <View style={tw` bg-white flex-1`}>
            <Screensheader
                name={'SELECT DOCTOR'}
                left={15}
                onPress={() => navigation.goBack()}
            />

            <View
                style={tw`w-85 h-12   flex-row  self-center  items-center`}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {/* card 1 */}

                    <>
                        <TouchableOpacity
                            // key={index}
                            onPress={() => {
                                // setloading(true)
                                // getallvideo(token)
                                setcat("All Videos")
                            }}>
                            <View style={[tw`bg-${cat === "All Doc" ? 'blue-400' : "white"} h-10 w-30 ml-5 border flex-row items-center justify-evenly rounded-3xl`, { borderRadius: 50, borderColor: '#00B1E7' }]}>
                               
                                <Text numberOfLines={1} style={tw`text-center w-20`}>{"All Doc"}</Text>
                            </View>
                        </TouchableOpacity>

                        {vrImages?.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    // setloading(true)
                                    // getcatvideo(item.id)
                                    setcat(item.text)
                                }}>
                                <View style={[tw`bg-${cat === item.text ? 'green-500' : 'white'} h-10 w-20 ml-5 border flex-row items-center justify-evenly rounded-3xl`, { borderRadius: 50, borderColor: '#00B1E7' }]}>
                                    <Image style={tw`h-5 w-5 rounded-full`} source={{ uri: item.url }} />
                                    <Text numberOfLines={1} style={tw`text-center w-12`}>{item.text}</Text>
                                </View>
                            </TouchableOpacity>

                        ))
                        }




                    </>


                </ScrollView>
            </View>

            <ScrollView style={tw`flex-1 mb-5 self-center `} showsVerticalScrollIndicator={false}>
                <View style={[tw`border flex-row justify-around items-center w-80 h-40 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>
                    <View style={tw`h-35  w-30`}>
                        <Image
                            style={tw`h-35 w-30`}
                            resizeMode='cover'
                            source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                        />
                    </View>
                    <View style={tw`h-35  w-45`}>
                        <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40  text-base`}>0312-30484939</Text>
                        <View style={tw` items-center h-10 w-30 justify-between flex-row mt-2`}>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/whatsapp.png")}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/edit.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/delete.png")}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

                <View style={[tw`border flex-row justify-around items-center w-80 h-40 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>
                    <View style={tw`h-35  w-30`}>
                        <Image
                            style={tw`h-35 w-30`}
                            resizeMode='cover'
                            source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                        />
                    </View>
                    <View style={tw`h-35  w-45`}>
                        <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40  text-base`}>0312-30484939</Text>
                        <View style={tw` items-center h-10 w-30 justify-between flex-row mt-2`}>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/whatsapp.png")}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/edit.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/delete.png")}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>


                <View style={[tw`border flex-row justify-around items-center w-80 h-40 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>
                    <View style={tw`h-35  w-30`}>
                        <Image
                            style={tw`h-35 w-30`}
                            resizeMode='cover'
                            source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                        />
                    </View>
                    <View style={tw`h-35  w-45`}>
                        <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40  text-base`}>0312-30484939</Text>
                        <View style={tw` items-center h-10 w-30 justify-between flex-row mt-2`}>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/whatsapp.png")}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/edit.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/delete.png")}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>


                <View style={[tw`border flex-row justify-around items-center w-80 h-40 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>
                    <View style={tw`h-35  w-30`}>
                        <Image
                            style={tw`h-35 w-30`}
                            resizeMode='cover'
                            source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                        />
                    </View>
                    <View style={tw`h-35  w-45`}>
                        <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40  text-base`}>0312-30484939</Text>
                        <View style={tw` items-center h-10 w-30 justify-between flex-row mt-2`}>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/whatsapp.png")}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/edit.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/delete.png")}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>


                <View style={[tw`border flex-row justify-around items-center w-80 h-40 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>
                    <View style={tw`h-35  w-30`}>
                        <Image
                            style={tw`h-35 w-30`}
                            resizeMode='cover'
                            source={{ uri: 'https://e0.pxfuel.com/wallpapers/578/919/desktop-wallpaper-doctor-female-doctor-thumbnail.jpg' }}
                        />
                    </View>
                    <View style={tw`h-35  w-45`}>
                        <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>Dr Naila Rozi</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40 text-gray-400 text-sm`}>Cardiologist</Text>
                        <Text numberOfLines={1} style={tw`font-light mt-1 w-40  text-base`}>0312-30484939</Text>
                        <View style={tw` items-center h-10 w-30 justify-between flex-row mt-2`}>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/whatsapp.png")}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/edit.png")}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    style={tw`h-6 w-6`}
                                    resizeMode='cover'
                                    source={require("../../Images/delete.png")}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default Yourplan