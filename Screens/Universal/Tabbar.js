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
                tabBarActiveTintColor: '#009688',  // Green color when focused
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
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/homeg.png") : require("../../Images/homec.png")} />
                    ),
                }}
                name="Home"
                component={Home}
            />

            <Tab.Screen
                options={{
                   
                    tabBarLabel: 'Sessions',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/vrglassesg.png") : require("../../Images/vrglasses.png")} />
                    ),
                }}
                name="Sessions"
                component={Sessions}
            />


            <Tab.Screen
                name="Yourplan"
                options={{
                   
                    tabBarLabel: 'Yourplan',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/subscriptiong.png") : require("../../Images/subscription.png")} />
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
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/persong.png") : require("../../Images/person.png")} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabbar;