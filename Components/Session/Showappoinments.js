import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"
import { showToast } from '../../Screens/Universal/Screensheader';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screensheader from '../../Screens/Universal/Screensheader';
import { Buttonnormal } from '../../Screens/Universal/Buttons';
import { Calendar } from 'react-native-calendars'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';
// import LinearGradient from 'react-native-linear-gradient'

const Showappointments = ({ navigation, route }) => {
    const { phone } = route.params;
    const [name, setname] = useState("");
    const [device, setdevice] = useState([]);
    const [dayselect, setdayselect] = useState("");
    const [price, setprice] = useState("");
    const [cat, setcat] = useState("All")
    const [userflag, setuserflag] = useState(true);
    const [GetData, setGetData] = useState([]);



    useEffect(() => {
        AsyncStorage.getItem("role").then((role) => {
            if (role === "user") {
                setuserflag(true)
            }
            else {
                setuserflag(false)
            }
        })
    }, [])

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

    useEffect(() => {

        AsyncStorage.getItem("email").then((email) => {
            const coll = collection(db, 'Doctors');
            const q = query(coll, where("doctorphone", '==', phone));

            const unSubscribe = onSnapshot(q, snapshot => {
                setGetData(
                    snapshot.docs.map(doc => ({
                        selecteduser: doc.data(),
                    })),
                );
            });
            return () => {
                unSubscribe();
            };
        })
    }, []);





    return (
        <>
            {
                userflag ?
                    <>
                        <View style={tw` bg-white flex-1`}>
                            <Screensheader
                                name={'BOOK APPOINMENT'}
                                left={10}
                                onPress={() => navigation.goBack()}
                            />



                            <ScrollView style={tw`flex-1 mb-5 self-center `} showsVerticalScrollIndicator={false}>
                                {
                                    GetData.map((data, index) => (
                                        < >
                                            <View key={index} style={[tw` flex-row justify-around items-center  w-80 h-35  self-center `]}>


                                                <Image
                                                    style={tw`h-30 w-35 border rounded-md`}
                                                    resizeMode='cover'
                                                    source={{ uri: data.selecteduser.profile }}
                                                />
                                                <View style={tw`w-40 h-30 justify-start  items-start `}>


                                                    <Text numberOfLines={1} style={tw`font-bold w-30 text-xl`}>{data.selecteduser.doctorname}</Text>
                                                    <Text numberOfLines={1} style={tw`font-light mt-2 w-30 text-gray-400 text-base`}>{data.selecteduser.doctortypelabel}</Text>

                                                    <Text numberOfLines={1} style={tw`font-medium mt-2  w-30 text-gray-400 text-base`}>From {data.selecteduser.doctortimefromlabel}</Text>
                                                    <Text numberOfLines={1} style={tw`font-medium mt-2  w-30 text-gray-400 text-base`}>To {data.selecteduser.doctortimetolabel}</Text>
                                                </View>


                                            </View>

                                            <View style={tw` self-center items-center justify-center w-80 h-45 `}>
                                                <Text style={tw`font-light text-sm`}>
                                                    {`At Dee-Felz, we provide top-notch healthcare with leading doctors like `}
                                                    <Text style={tw`font-semibold`}>
                                                        {data.selecteduser.doctorname}
                                                    </Text>
                                                    {`, the city’s top `}
                                                    <Text style={tw`font-semibold`}>
                                                        {data.selecteduser.doctortypelabel}
                                                    </Text>
                                                    {`. Our clinic ensures exceptional care with skilled professionals dedicated to your well-being. From expert diagnosis to advanced treatments, trust Dee-Felz for unparalleled medical attention. Experience excellence in healthcare where your health and satisfaction are our highest priorities. Choose Dee-Felz for the best in medical care`}
                                                </Text>

                                            </View>

                                            <View style={tw`h-55  mb-5  justify-around flex-col w-80 self-center `}>
                                                <Text style={tw`font-semibold text-lg`}>Choose Your Appointment Day</Text>
                                                <View style={tw` items-center h-10  w-70 self-center justify-between flex-row `}>

                                                    <TouchableOpacity
                                                        disabled={data.selecteduser.monday === false ? true : false}
                                                        onPress={() => {
                                                            setdayselect("monday")
                                                        }}
                                                    >
                                                        <View style={[tw`h-12 w-20 rounded-3xl border border-blue-300 bg-${data.selecteduser.monday === true ? dayselect === "monday" ? "blue-300" : "white" : "gray-300"}  border border-blue-300 items-center justify-center`,]}>
                                                            <Text style={tw`text-xs text-black`}>Monday</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        disabled={data.selecteduser.tuesday === false ? true : false}
                                                        onPress={() => {
                                                            setdayselect("tuesday")
                                                        }}
                                                    >
                                                        <View style={[tw`h-12 w-20 rounded-3xl border border-blue-300 bg-${data.selecteduser.tuesday === true ? dayselect === "tuesday" ? "blue-300" : "white" : "gray-300"}  border border-blue-300 items-center justify-center`,]}>
                                                            <Text style={tw`text-xs text-black`}>Tuesday</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        disabled={data.selecteduser.wednesday === false ? true : false}
                                                        onPress={() => {
                                                            setdayselect("wednesday")
                                                        }}
                                                    >
                                                        <View style={[tw`h-12 w-20 rounded-3xl border border-blue-300 bg-${data.selecteduser.wednesday === true ? dayselect === "wednesday" ? "blue-300" : "white" : "gray-300"}  border border-blue-300 items-center justify-center`,]}>
                                                            <Text style={tw`text-xs text-black`}>Wednesday</Text>
                                                        </View>
                                                    </TouchableOpacity>






                                                </View>


                                                <View style={tw` items-center h-10  w-70 self-center justify-between flex-row `}>

                                                    <TouchableOpacity
                                                        disabled={data.selecteduser.thursday === false ? true : false}
                                                        onPress={() => {
                                                            setdayselect("thursday")
                                                        }}
                                                    >
                                                        <View style={[tw`h-12 w-20 rounded-3xl border border-blue-300 bg-${data.selecteduser.thursday === true ? dayselect === "thursday" ? "blue-300" : "white" : "gray-300"}  border border-blue-300 items-center justify-center`,]}>
                                                            <Text style={tw`text-xs text-black`}>Thursday</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        disabled={data.selecteduser.friday === false ? true : false}
                                                        onPress={() => {
                                                            setdayselect("friday")
                                                        }}
                                                    >
                                                        <View style={[tw`h-12 w-20 rounded-3xl border border-blue-300 bg-${data.selecteduser.friday === true ? dayselect === "friday" ? "blue-300" : "white" : "gray-300"}  border border-blue-300 items-center justify-center`,]}>
                                                            <Text style={tw`text-xs text-black`}>Friday</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity
                                                        disabled={data.selecteduser.saturday === false ? true : false}
                                                        onPress={() => {
                                                            setdayselect("saturday")
                                                        }}
                                                    >
                                                        <View style={[tw`h-12 w-20 rounded-3xl border border-blue-300 bg-${data.selecteduser.saturday === true ? dayselect === "saturday" ? "blue-300" : "white" : "gray-300"}  border border-blue-300 items-center justify-center`,]}>
                                                            <Text style={tw`text-xs text-black`}>Saturday</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={tw` items-center h-10  w-70 self-center justify-center flex-row `}>

                                                    <TouchableOpacity
                                                        disabled={data.selecteduser.sunday === false ? true : false}
                                                        onPress={() => {
                                                            setdayselect("sunday")
                                                        }}
                                                    >
                                                        <View style={[tw`h-12 w-20 rounded-3xl border border-blue-300 bg-${data.selecteduser.sunday === true ? dayselect === "sunday" ? "blue-300" : "white" : "gray-300"}  border border-blue-300 items-center justify-center`,]}>
                                                            <Text style={tw`text-xs text-black`}>Sunday</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                </View>

                                            </View>

                                            <TouchableOpacity>
                                                <View style={tw` rounded-md bg-green-400 w-80 self-center items-center justify-center h-10  `}>

                                                    <Text style={tw`text-white`}>
                                                        BOOK APPOINMENT
                                                    </Text>

                                                </View>
                                            </TouchableOpacity>
                                        </>
                                    ))
                                }


                            </ScrollView>
                        </View>
                    </>
                    :

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
            }
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateText: {
        marginTop: 20,
        fontSize: 18,
        color: 'blue',
    },
    selectDateText: {
        marginTop: 20,
        fontSize: 18,
        color: 'gray',
    },
});

export default Showappointments

