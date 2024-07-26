import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import Options from '../Universal/Options'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { showToast } from '../Universal/Input'
import Toast from 'react-native-toast-message'

const Profile = ({ navigation }) => {

  const [name, setname] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");


  useFocusEffect(
    React.useCallback(() => {
        const checkUserRole = async () => {
           AsyncStorage.getItem("token").then((token)=>{
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
        setname(result.data.first_name +" "+ result.data.last_name)
        setfname(result.data.first_name)
        setlname(result.data.last_name)
        setemail(result.data.email)
       

      } else {
   
        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {
    
      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };


  return (
    <View style={tw`flex-1`}>

      <View style={tw`h-80 w-full`}>
        <Image
          style={tw`h-80 w-full absolute`}
          source={require('../../Images/gradient.png')}
        />


        <View style={tw`h-30 w-30 mt-10 items-center justify-center self-center border-black border rounded-full`}>
          <Image
            style={tw`h-30 w-30 rounded-full`}
            source={require('../../Images/logo.png')}
          />
        </View>


        <View style={tw`self-center justify-center mt-5`}>
          <Text style={tw`text-xl text-gray-200`}>
            {name}
          </Text>
        </View>

      </View>
      <View style={[{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }, tw` justify-start  items-center shadow-md -mt-10 border-black bg-white h-120 w-90`]}>
        <View style={tw`mt-15`}>
          <Options text={"Change Password"} top={1} top1={5} flag={true} left={44}
            onPress={() => {
              navigation.navigate("Forget")
            }}
          />
          <Options text={"Update Profile"} top={1} top1={5} flag={true} left={44}
            onPress={() => {
              navigation.navigate("Updateprofile", {
               fname : fname,
               lname : lname,
               email : email
              })
            }}
          />
          <Options text={"Privacy Policy"} top={7} top1={5} flag={true} left={51}
            onPress={() => (
              navigation.navigate("PP")
            )}
          />
          <Options text={"App Version"} top={7} top1={5} flag={false} text1={1.1} logo={false} left={55} />

          <Options text={"Logout"} top={7} top1={5} flag={true} logo={false} left={65}
            onPress={() => {
              // AsyncStorage.removeItem("mobileid").then(() => {

              // })

              Alert.alert('Alert', 'Are You Sure You Want Logout?', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK', onPress: () => {
                    AsyncStorage.removeItem("mobileid").then(() => {
                      // AsyncStorage.removeItem("email").then(() => {
                      AsyncStorage.removeItem("token").then(() => {
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'WelcomeScreen' }],
                        });
                        // navigation.navigate("Login")

                        // })
                      })
                    })
                  }
                },
              ]);
            }}

          />

        </View>
        <Toast/>
      </View>
    </View>
  )
}

export default Profile