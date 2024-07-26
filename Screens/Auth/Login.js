import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { Input, showToast } from '../Universal/Input'
// import CheckBox from '@react-native-community/checkbox';
import { Buttonnormal } from '../Universal/Buttons';
import Screensheader from '../Universal/Screensheader';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Deviceinfo from 'react-native-device-info';

const Login = ({ navigation }) => {

  const [customerflag, setcustomerflag] = useState(true)
  const [customerflag1, setcustomerflag1] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false)


  useFocusEffect(
    React.useCallback(() => {

      return () => {
        setEmail(null)
        setPassword(null)
      }
    }, []),
  );

  const handlelogin = async () => {
    if (!email || !password) {
      showToast("error", "Error", "Required Field", true, 3000);
    }
    else {

      const formData = new FormData();
      formData.append('password', password);
      formData.append('email', email);

      try {
        setloading(true)
        const response = await fetch('https://vr.evolvsolution.com/api/login', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          // setloading(false)
          console.log('Signup successful:', result);
          // navigation.navigate('Subplan')
          console.log("token :", result.data.token);
          AsyncStorage.setItem("token", result.data.token).then(() => {
            getinfo(result.data.token)
            setEmail(null)
            setPassword(null)
          })

        } else {

          setloading(false)
          showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
          // console.error('Signup failed:', result);

        }
      } catch (error) {
        setloading(false)
        showToast("error", "Error", error, true, 3000);
        console.error('Catch Error:', error)
      }
    }
  };


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
        const id = await Deviceinfo.getUniqueId();

        console.log('Request successful:', result);
        // navigation.navigate('Subplan')
        console.log("result :", result.data.subscription);
        // navigation.navigate('Subplan')
        if (result.data.subscription === null) {
        
          navigation.navigate('Subplan')
          setEmail(null);
          setPassword(null);
          setloading(false);
          console.log("result :", result.data.subscription);
        }
        else {
          AsyncStorage.setItem("mobileid", id).then(() => {
            
            navigation.navigate('Tabbar')
            setEmail(null);
            setPassword(null);
            setloading(false);
            console.log("result else:", result.data.subscription);
          })

        }

      } else {
        setloading(false);
        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {
      setloading(false);
      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };


  return (
    <>

      <View style={tw` bg-slate-50 flex-1  `}>
        <Screensheader
          name={"Login"}
          left={28}
          onPress={() => (
            navigation.goBack()
          )}
        />
        <View style={tw`items-center`}>
          <View style={tw`w-80 h-20 items-center justify-center mt-5`}>
            <Text style={[tw`text-3xl font-bold text-gray-400`, { color: '#199A8E' }]}>
              Welcome
            </Text>
            <Text style={[tw`text-sm font-normal text-gray-400`, { color: '#199A8E' }]}>
              Sign in to acess your account
            </Text>
          </View>

          {/* <View style={tw` flex-row justify-center items-center h-14 w-80 mt-5`}>

            <TouchableOpacity
              onPress={() => {
                setcustomerflag(!customerflag)
                setcustomerflag1(!customerflag1)

              }}
            >
              <View style={tw` h-12 w-35 items-center justify-center rounded-3xl bg-${customerflag ? 'red-500' : 'slate-50'}`}>
                <Text style={tw`text-${customerflag ? 'white' : 'gray-400'}`}>
                  Customer
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setcustomerflag(!customerflag)
                setcustomerflag1(!customerflag1)

              }}
            >
              <View style={tw` h-12 w-35 items-center justify-center rounded-3xl bg-${customerflag1 ? 'red-500' : 'slate-50'}`}>
                <Text style={tw`text-${customerflag1 ? 'white' : 'gray-400'}`}>
                  Merchant
                </Text>
              </View>
            </TouchableOpacity>


          </View> */}

          <Input
            value={email}
            onchangetext={setEmail}
            source={require("../../Images/mail.png")}
            placeholder={"Enter Your Email"}
          />

          <Input
            value={password}
            entry={true}
            onchangetext={setPassword}
            source={require("../../Images/padlock.png")}
            placeholder={"Enter Your Password"}
          />


          <View style={tw` justify-end  items-center flex-row w-80 h-10 mt-5`}>


            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Forget')
              }}
            >
              <Text style={[tw` text-center`, { color: '#199A8E' }]}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          {
            loading ?
              <ActivityIndicator size={'large'} color={'#199A8E'} />
              :
              <View style={tw` justify-between w-80 h-15 mt-5 `}>
                <Buttonnormal
                  onPress={() => {
                    // navigation.navigate('Subplan')
                    handlelogin()
                  }}
                  c1={'#199A8E'}
                  c2={'#199A8E'}
                  style={tw`text-white`}
                  title={"LOGIN"}
                />
              </View>
          }
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup")
            }}
          >
            <View style={tw`mt-5`}>

              <Text>
                New Member?

                <Text style={{ color: '#199A8E' }}> Sign Up Now</Text>

              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Toast />
      </View>
    </>
  )
}

export default Login