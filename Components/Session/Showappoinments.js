import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"
import { showToast } from '../../Screens/Universal/Input';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Screensheader from '../../Screens/Universal/Screensheader';
import { Buttonnormal } from '../../Screens/Universal/Buttons';
import { Calendar } from 'react-native-calendars'
import { collection, doc, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import uuid from 'react-native-uuid';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import LinearGradient from 'react-native-linear-gradient'

const Showappointments = ({ navigation, route }) => {
    const { phone } = route.params;
    const [email, setemail] = useState("");
    const [device, setdevice] = useState([]);
    const [dayselect, setdayselect] = useState("");
    const [price, setprice] = useState("");
    const [cat, setcat] = useState("Today All")
    const [userflag, setuserflag] = useState(true);
    const [loading, setloading] = useState(false);
    const [loading1, setloading1] = useState(false);
    const [GetData, setGetData] = useState([]);
    const [GetData1, setGetData1] = useState([]);
    const userid = uuid.v4();
    const datee = new Date()
    const showdate = datee.getFullYear() + "/" + (datee.getMonth() + 1) + "/" + datee.getDate();
    const [model, setmodel] = useState(false)
    const [date, setdate] = useState("")
    const [model1, setmodel1] = useState(false)
    const [time, settime] = useState("")


    useEffect(() => {
        AsyncStorage.getItem("role").then((role) => {
            if (role === "user") {
                setuserflag(true)
                AsyncStorage.getItem("email").then((email) => {
                    setemail(email)
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
            }
            else {
                showtodayappointment()
                setuserflag(false)
            }
        })
    }, [])

    useEffect(() => {
        AsyncStorage.getItem("email").then((email) => {
            setemail(email)
            const coll = collection(db, 'Profile');
            const q = query(coll, where("email", '==', email));

            const unSubscribe = onSnapshot(q, snapshot => {
                setGetData1(
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

    const vrImages = [
        {
            url: "https://vection-cms-prod.s3.eu-central-1.amazonaws.com/Adobe_Stock_506941973_cc825880a8.jpeg",
            text: "Today All"
        },
        {
            url: "https://images.inc.com/uploaded_files/image/1920x1080/getty_921019710_413686.jpg",
            text: "Today Cancelled"
        },

        {
            url: "https://images.inc.com/uploaded_files/image/1920x1080/getty_921019710_413686.jpg",
            text: "All Booking"
        },

    ];



    const bookappointment = async (doctorname, doctorphone, monday, tuesday, wednesday, thursday, friday, saturday, sunday, label2, label, label1, url) => {
        if (!doctorname || !doctorphone || !time || !date) {
            showToast("error", "Field Required", "Must Fill All The Field", true, 1000)
        }

        else {
            setloading(true)
            setDoc(doc(db, 'Appointment', userid), {
                doctorname: doctorname,
                doctorphone: doctorphone,
                doctortypelabel: label2,
                username: GetData1[0].selecteduser.fullname,
                phone: GetData1[0].selecteduser.phone,
                bookdate: date,
                booktime: time,
                monday: monday,
                tuesday: tuesday,
                wednesday: wednesday,
                thursday: thursday,
                friday: friday,
                saturday: saturday,
                sunday: sunday,
                doctortimefromlabel: label,
                doctortimetolabel: label1,
                userid,
                email: email,
                todaydate: showdate,
                status: "confirmed",
                timestamp: serverTimestamp(),
                profile: url
            })
                .then(() => {
                    console.log('done');

                    setloading(false)
                    Alert.alert('Congratulation', 'Appointment Has Been Booked', [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Home'),
                        },
                    ]);
                })
                .catch(error => {
                    setloading(false)
                    // console.log(error);
                    Alert.alert('this :', error.message);
                });

        }
    };


    // useEffect(() => {
    //     if (!userflag) {
    //         showtodayappointment()
    //     }

    // }, [userflag]);


    const showtodayappointment = async () => {
        AsyncStorage.getItem("email").then((email) => {
            const coll = collection(db, 'Appointment');
            const q = query(coll, where('doctorphone', '==', phone), where('bookdate', '==', showdate), where('status', '==', "confirmed"));

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
    }

    const showallappointment = async () => {
        AsyncStorage.getItem("email").then((email) => {
            const coll = collection(db, 'Appointment');
            const q = query(coll, where('doctorphone', '==', phone));

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
    }

    const showtodaycancelledappointment = async () => {
        AsyncStorage.getItem("email").then((email) => {
            const coll = collection(db, 'Appointment');
            const q = query(coll, where('doctorphone', '==', phone), where('todaydate', '==', showdate), where('status', '==', "cancelled"));

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
    }


    const handleConfirm = (day) => {
        const hours = day.getHours();
        const minutes = day.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

        settime(formattedTime);
        setmodel1(false);
    };

    const updatedoc = async (status,apid) => {
        setloading1(true)
        updateDoc(doc(db, 'Appointment', apid), {
            status: status
        })
            .then(() => {
                console.log('done');
                setloading1(false);
                if (cat === "Today Cancelled") {
                    showtodaycancelledappointment()
                    // setcat(item.text)
                } else if (cat === "Today All") {
                    showtodayappointment()
                    // setcat(item.text)
                }
                else {
                    showallappointment()
                    // setcat(item.text)
                }
                // showtodayappointment()
                // Alert.alert('Congratulation', 'Appoint Has Been Cancelled', [
                //     { text: 'OK' },
                // ]);
            })
            .catch(error => {
                setloading1(false);
                Alert.alert('this :', error.message);
            });
    };


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

                                            <View style={tw` self-center items-center justify-center w-80 h-20 `}>
                                                <Text style={tw`font-light text-sm`}>
                                                    {`At Dee-Felz, we provide top-notch healthcare with leading doctors like `}
                                                    <Text style={tw`font-semibold`}>
                                                        {data.selecteduser.doctorname}
                                                    </Text>
                                                    {`, the city’s top `}
                                                    <Text style={tw`font-semibold`}>
                                                        {data.selecteduser.doctortypelabel}
                                                    </Text>
                                                    {/* {`. Our clinic ensures exceptional care with skilled professionals dedicated to your well-being. From expert diagnosis to advanced treatments, trust Dee-Felz for unparalleled medical attention.`} */}
                                                </Text>

                                            </View>

                                            <View style={tw`h-80  mb-5  justify-between flex-col w-80 self-center `}>


                                                <View style={tw`h-20  self-center  w-80 `}>
                                                    <View style={tw` items-center h-10  w-70 self-center justify-between flex-row `}>

                                                        <View style={[tw`h-7 w-15 rounded-3xl  border border-blue-300 items-center justify-center`, { backgroundColor: data.selecteduser.monday === true ? '#00B1E7' : 'lightgray' }]}>
                                                            <Text style={tw`text-xs text-black`}>Monday</Text>
                                                        </View>
                                                        <View style={[tw`h-7 w-15 rounded-3xl items-center border border-blue-300 justify-center`, { backgroundColor: data.selecteduser.tuesday === true ? '#00B1E7' : 'lightgray' }]}>
                                                            <Text style={tw`text-xs text-black`}>Tuesday</Text>
                                                        </View>
                                                        <View style={[tw`h-7 w-20 rounded-3xl items-center border border-blue-300 justify-center`, { backgroundColor: data.selecteduser.wednesday === true ? '#00B1E7' : 'lightgray' }]}>
                                                            <Text style={tw`text-xs text-black`}>Wednesday</Text>
                                                        </View>

                                                        <View style={[tw`h-7 w-15 rounded-3xl  border border-blue-300 items-center justify-center`, { backgroundColor: data.selecteduser.thursday === true ? '#00B1E7' : 'lightgray' }]}>
                                                            <Text style={tw`text-xs text-black`}>Thursday</Text>
                                                        </View>




                                                    </View>


                                                    <View style={tw` items-center h-10  w-50 self-center justify-between flex-row `}>

                                                        <View style={[tw`h-7 w-15 rounded-3xl items-center border border-blue-300 justify-center`, { backgroundColor: data.selecteduser.friday === true ? '#00B1E7' : 'lightgray' }]}>
                                                            <Text style={tw`text-xs text-black`}>Friday</Text>
                                                        </View>
                                                        <View style={[tw`h-7 w-15 rounded-3xl items-center border border-blue-300 justify-center`, { backgroundColor: data.selecteduser.saturday === true ? '#00B1E7' : 'lightgray' }]}>
                                                            <Text style={tw`text-xs text-black`}>Saturday</Text>
                                                        </View>
                                                        <View style={[tw`h-7 w-15 rounded-3xl  border border-blue-300 items-center justify-center`, { backgroundColor: data.selecteduser.sunday === true ? '#00B1E7' : 'lightgray' }]}>
                                                            <Text style={tw`text-xs text-black`}>Sunday</Text>
                                                        </View>

                                                    </View>

                                                </View>

                                                <View style={tw` w-80 h-22 justify-between self-center `}>
                                                    <Text style={tw`font-extralight`}>Select Data When Doctor Available otherwise Your Appointmment Will Be Cancelled</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setmodel(!model)
                                                        }}
                                                    >
                                                        <View style={tw`h-10 w-80 items-center justify-center border border-blue-400`}>
                                                            <Text style={tw`text-lg font-normal`}>{date ? date : "SELECT APPOINTMENT DATE"}</Text>

                                                        </View>
                                                    </TouchableOpacity>

                                                </View>
                                                <DateTimePickerModal
                                                    isVisible={model}
                                                    mode="date"
                                                    onConfirm={day => {
                                                        setdate(

                                                            day.getFullYear() +
                                                            '/' +
                                                            (day.getMonth() + 1) +
                                                            '/' +
                                                            day.getDate(),
                                                        );
                                                        setmodel(!model)
                                                    }}
                                                    onCancel={() =>
                                                        setmodel(!model)
                                                    }
                                                />


                                                <View style={tw` w-80 h-22 justify-between self-center `}>
                                                    <Text style={tw`font-extralight`}>Select Time Between When Doctor Available otherwise Your Appointmment Will Be Cancelled</Text>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setmodel1(!model1)
                                                        }}
                                                    >
                                                        <View style={tw`h-10 w-80 items-center justify-center border border-blue-400`}>
                                                            <Text style={tw`text-lg font-normal`}>{time ? time : "SELECT APPOINTMENT TIME"}</Text>

                                                        </View>
                                                    </TouchableOpacity>

                                                </View>
                                                <DateTimePickerModal
                                                    isVisible={model1}
                                                    mode="time"
                                                    onConfirm={handleConfirm}
                                                    onCancel={() =>
                                                        setmodel1(!model1)
                                                    }
                                                />

                                            </View>

                                            {
                                                loading ?
                                                    <ActivityIndicator style={tw`mt-5`} size={'large'} color={'blue'} />
                                                    :
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            bookappointment(
                                                                data.selecteduser.doctorname,
                                                                data.selecteduser.doctorphone,
                                                                data.selecteduser.monday,
                                                                data.selecteduser.tuesday,
                                                                data.selecteduser.wednesday,
                                                                data.selecteduser.thursday,
                                                                data.selecteduser.friday,
                                                                data.selecteduser.saturday,
                                                                data.selecteduser.sunday,
                                                                data.selecteduser.doctortypelabel,
                                                                data.selecteduser.doctortimefromlabel,
                                                                data.selecteduser.doctortimetolabel,
                                                                data.selecteduser.profile
                                                            )

                                                        }}
                                                    >
                                                        <View style={tw` rounded-md bg-green-400 w-80 self-center items-center justify-center h-10  `}>

                                                            <Text style={tw`text-white`}>
                                                                BOOK APPOINMENT
                                                            </Text>

                                                        </View>
                                                    </TouchableOpacity>
                                            }

                                        </>
                                    ))
                                }


                            </ScrollView>
                            <Toast />
                        </View>
                    </>
                    :

                    <View style={tw` bg-white flex-1`}>

                        <ScrollView style={tw`flex-1 mb-5 self-center `} showsVerticalScrollIndicator={false}>
                            <View style={tw` bg-white flex-1`}>
                                <Screensheader
                                    name={'TODAY APPOINMENTS'}
                                    left={5}
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

                                                        if (item.text === "Today Cancelled") {
                                                            showtodaycancelledappointment()
                                                            setcat(item.text)
                                                        } else if (item.text === "Today All") {
                                                            showtodayappointment()
                                                            setcat(item.text)
                                                        }
                                                        else {
                                                            showallappointment()
                                                            setcat(item.text)
                                                        }

                                                    }}>
                                                    <View style={[tw`bg-${cat === item.text ? 'blue-400' : 'white'} h-10 w-30 ml-5 border flex-row items-center justify-evenly rounded-3xl`, { borderRadius: 50, borderColor: '#00B1E7' }]}>
                                                        {/* <Image style={tw`h-5 w-5 rounded-full`} source={{ uri: item.url }} /> */}
                                                        <Text numberOfLines={1} style={tw`text-center text-${cat === item.text ? "white" : "black"} w-28`}>{item.text}</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            ))
                                            }
                                        </>


                                    </ScrollView>
                                </View>

                                <ScrollView style={tw`flex-1 mb-5 self-center `} showsVerticalScrollIndicator={false}>

                                    {
                                        GetData.map((data, index) => (
                                            <TouchableOpacity
                                                disabled={true}
                                                key={index}
                                            >
                                                <View style={[tw`border flex-col justify-center items-center w-80 h-60 rounded-md self-center mt-5`, { borderColor: "#00B1E7" }]}>

                                                    <View style={tw`h-15 w-70 flex-row items-center justify-between `}>

                                                        <View>
                                                            <Text numberOfLines={1} style={tw`font-bold w-40 text-xl`}>{data.selecteduser.doctorname}</Text>
                                                            <Text numberOfLines={1} style={tw`font-light  w-40 text-gray-400 text-sm`}>{data.selecteduser.doctortypelabel}</Text>
                                                        </View>

                                                        <Image
                                                            style={tw`h-15 w-15 rounded-full`}
                                                            resizeMode='cover'
                                                            source={{ uri: data.selecteduser.profile }}
                                                        />
                                                    </View>

                                                    <View style={tw`h-10  justify-around items-center flex-row w-75`}>
                                                        <Text numberOfLines={1} style={tw`font-normal  text-base`}>{data.selecteduser.bookdate}</Text>
                                                        <Text numberOfLines={1} style={tw`font-normal   text-sm`}>{data.selecteduser.booktime}</Text>
                                                        <Text numberOfLines={1} style={tw`font-normal text-green-500   text-base`}>{data.selecteduser.status}</Text>


                                                    </View>

                                                    <View style={tw`h-10  justify-around items-center flex-row w-70`}>
                                                        <Text numberOfLines={1} style={tw`font-normal text-start   w-40  text-base`}>{data.selecteduser.username}</Text>
                                                        <TouchableOpacity
                                                            onPress={() => (
                                                                Linking.openURL(`whatsapp://send?text=Hello ${data.selecteduser.username}\nYou Booked Appoinment in Dee-felz Clinic\nYour Booking Date And Time is\n${data.selecteduser.bookdate} ${data.selecteduser.booktime}&phone=${data.selecteduser.phone}`)
                                                            )}
                                                        >
                                                            <Text numberOfLines={1} style={tw`font-normal text-right underline w-30 text-sm`}>{data.selecteduser.phone}</Text>
                                                            {/* <Text numberOfLines={1} style={tw`font-normal text-green-500   text-base`}>{data.selecteduser.status}</Text> */}
                                                        </TouchableOpacity>

                                                    </View>

                                                    {
                                                        loading1 ?
                                                            <ActivityIndicator size="large" style={tw`mt-5`} color="#00B1E7" />
                                                            :
                                                            <TouchableOpacity 
                                                            onPress={()=>{
                                                                updatedoc(data.selecteduser.status === "confirmed" ? 'cancelled' : 'confirmed' ,data.selecteduser.userid)
                                                            }}
                                                            >
                                                                <View style={tw` rounded-md bg-slate-200 w-70 items-center justify-center h-10 mt-5 `}>

                                                                    <Text>
                                                                        {data.selecteduser.status === "confirmed" ? "CANCEL BOOKING" : "ACCEPT AGAIN"}
                                                                    </Text>

                                                                </View>
                                                            </TouchableOpacity>
                                                    }

                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }


                                </ScrollView>
                            </View>



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

