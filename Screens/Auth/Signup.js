import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { Input, showToast } from '../Universal/Input'
import CheckBox from '@react-native-community/checkbox';
import { Buttonnormal } from '../Universal/Buttons';
import Screensheader from '../Universal/Screensheader';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';

const Signup = ({ navigation }) => {

  const [customerflag, setcustomerflag] = useState(true)
  const [customerflag1, setcustomerflag1] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [loading, setloading] = useState(false)

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  useFocusEffect(
    React.useCallback(() => {

      return () => {
        setEmail(null)
        setPassword(null)
        setFirstName(null)
        setLastName(null)
      }
    }, []),
  );

  const handleSignup = async () => {
    if (!email || !password || !firstName || !lastName) {
      showToast("error", "Error", "Required Field", true, 3000);
    }
    else {

      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('password', password);

      try {
        setloading(true)
        const response = await fetch('https://vr.evolvsolution.com/api/signup', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          setloading(false)
          console.log('Signup successful:', result);
          navigation.navigate('Login');
        } else {
          setloading(false)
          showToast("error", "Error", result.errors[0], true, 3000);
          console.error('Signup failed:', result);
        }
      } catch (error) {
        setloading(false)
        showToast("error", "Error", result.errors[0], true, 3000);
        console.error('Error:', error);
      }
    }
  };


  return (
    <>

      <View style={tw` bg-slate-50 flex-1  `}>
        <Screensheader
          name={"Signup"}
          left={25}
          onPress={() => (
            navigation.goBack()
          )}
        />
        <View style={tw`items-center`}>
          <View style={tw`w-80 h-20 items-center justify-center mt-5`}>
            <Text style={[tw`text-3xl font-bold text-gray-400`, { color: '#199A8E' }]}>
              Great
            </Text>
            <Text style={[tw`text-sm font-normal text-gray-400`, { color: '#199A8E' }]}>
              Sign Up To Create Your Account
            </Text>
          </View>

          <Input
            onchangetext={setFirstName}
            source={require("../../Images/user.png")}
            placeholder={"Your First Name"}
          />

          <Input
            onchangetext={setLastName}
            source={require("../../Images/user.png")}
            placeholder={"Your Last Name"}
          />

          <Input
            onchangetext={setEmail}
            source={require("../../Images/mail.png")}
            placeholder={"Enter Your Email"}
          />

          <Input
            onchangetext={setPassword}
            entry={true}
            source={require("../../Images/padlock.png")}
            placeholder={"Enter Your Password"}
          />


          <View style={tw` justify-start  items-center flex-row w-80 h-12 mt-5`}>
            <View style={tw` flex-row items-center justify-center w-80 h-10  `}>
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
              <Text style={tw`text-gray-400 `}>By Checking The Box You Agree Our Term And Condition</Text>
            </View>

          </View>

          {
            loading ?
              <ActivityIndicator size={'large'} color={'#199A8E'} />
              :
              <View style={tw` justify-between w-80 h-15 mt-5 `}>
                <Buttonnormal
                  onPress={() => {
                    // navigation.navigate('Tabbar')
                    handleSignup()
                  }}
                  c1={'#199A8E'}
                  c2={'#199A8E'}
                  style={tw`text-white`}
                  title={"SIGNUP"}
                />



              </View>
          }


          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login")
            }}
          >
            <View style={tw`mt-5`}>

              <Text>
                Already Member?

                <Text style={{ color: '#199A8E' }}> Login Now</Text>

              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Toast />
      </View>
    </>
  )
}

export default Signup