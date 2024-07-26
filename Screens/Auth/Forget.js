import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { Input, showToast } from '../Universal/Input'
import CheckBox from '@react-native-community/checkbox';
import { Buttonnormal } from '../Universal/Buttons';
import Screensheader from '../Universal/Screensheader';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const Forget = ({ navigation }) => {

  const [customerflag, setcustomerflag] = useState(true)
  const [customerflag1, setcustomerflag1] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const [email, setemail] = React.useState('');
  const [loading, setloading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      
      return () => {
       setemail(null)
      }
    }, []),
  );

  const handleforget = async () => {
    if (!email) {
      showToast("error", "Error", "Required Field", true, 3000);
    }
    else {

    const formData = new FormData();

    formData.append('email', email);

    try {
      setloading(true)
      const response = await fetch('https://vr.evolvsolution.com/api/forgot-password', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log("result :",result);
      if (response.ok) {
        setloading(false)
        // console.log('Signup successful:', result);
        navigation.navigate('Newpass', { email: email });
      } else {
        setloading(false)
        showToast("error", "Error", result.errors[0], true, 3000);
        // console.error('Signup failed:', result);
      }
    } catch (error) {
      setloading(false)
      showToast("error", "Error", error, true, 3000);
      console.error('Error:', error);
    }
  }
  };


  return (
    <>

      <View style={tw` bg-slate-50 flex-1  `}>
        <Screensheader
          // name={"Signup"}
          // left={25}
          onPress={() => (
            navigation.goBack()
          )}
        />
        <View style={tw`items-center`}>
          <View style={tw`w-80 h-20 items-start justify-center mt-5`}>
            <Text style={[tw`text-3xl font-bold text-gray-400`, { color: '#199A8E' }]}>
              Forget Your Password?
            </Text>
            <Text style={[tw`text-sm font-normal text-gray-400`, { color: '#199A8E' }]}>
              Enter Your Email We Will Send You A Code
            </Text>
          </View>


          <View style={tw`mt-10`}>
            <Input
              value={email}
              onchangetext={setemail}
              source={require("../../Images/mail.png")}
              placeholder={"Enter Your Email"}
            />



            {
              loading ?
                <ActivityIndicator size={'large'} color={'#199A8E'} style={tw`mt-5`}/>
                :
                <View style={tw` justify-between w-80 h-15 mt-5 `}>
                  <Buttonnormal
                    onPress={() => {
                      // navigation.navigate('Code')
                      handleforget()
                    }}
                    c1={'#199A8E'}
                    c2={'#199A8E'}
                    style={tw`text-white`}
                    title={"SEND CODE"}
                  />
                </View>
            }

          </View>

        </View>
        <Toast />
      </View>
    </>
  )
}

export default Forget