import React from "react";
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tw from "twrnc"
// import Supplier from "../Tabbar/Supplier";
import Home from "../Tabbar/Home";
import Profile from "../Tabbar/Profile";
import Sessions from "../Tabbar/Sessions";
import Yourplan from "../Tabbar/Yourplan";
const Tab = createBottomTabNavigator();

function Tabbar() {
    return (
        <Tab.Navigator

            screenOptions={{
                tabBarActiveTintColor: '#00B1E7',  // Green color when focused
                tabBarInactiveTintColor: '#000000',  // Black color when not focused

                // tabBarBackground: () => (
                //     <View style={{flex:1, backgroundColor: 'white' }} />
                //   ),
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    // borderRadius: 40,
                    // marginBottom: 10,
                    // width: 300,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // left: 30,
                    // right: 30,
                    // height: 60,
                    backgroundColor: 'white'
                    //  paddingBottom:20,
                    // position:'absolute'

                }
            }}>
            <Tab.Screen
                options={{
                    
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/homeb.png") : require("../../Images/home.png")} />
                    ),
                }}
                name="Home"
                component={Home}
            />

            <Tab.Screen
                options={{
                   
                    tabBarLabel: 'Add Doctor',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/doctorb.png") : require("../../Images/doctor.png")} />
                    ),
                }}
                name="Sessions"
                component={Sessions}
            />


            <Tab.Screen
                name="Yourplan"
                options={{
                   
                    tabBarLabel: 'Appointment',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/to-do-listb.png") : require("../../Images/to-do-list.png")} />
                    ),
                }}
                component={Yourplan}
            />



            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                   
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/userb.png") : require("../../Images/user.png")} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabbar;