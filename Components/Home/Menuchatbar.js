import {View, Text, Image, TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import tw from 'twrnc';
import Ionicon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';
import { showToast } from '../../Screens/Universal/Input';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Menuchatbar = ({navigation}) => {

  // const auth = getAuth(app);
  const [name, setname] = useState("");


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
       

      } else {
   
        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {
    
      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };






  return (
    <View style={[tw`top-5 flex w-80  self-center justify-between flex-row `, {backgroundColor: '#FFFFFF'}]}>
      <View style={tw`w-65 flex flex-row `}>
        <Text numberOfLines={1} style={tw`text-lg  font-medium text-gray-600`}>Welcome {name} </Text>
        {/* <Highfy width={20}  height={20}/> */}
      </View>

      <View style={tw` w-15 flex-row justify-end items-end flex `}>
      
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
          }}>
          <Ionicon
            name="search"
            size={20}
            style={tw`left-0`}
            onPress={() => {
              // share()
              navigation.navigate('Search');
              console.log('press');
            }}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Inbox');
          }}>
          <Ionicon
            name="user"
            size={20}
            style={tw`left-0`}
            onPress={() => {
              // share()
              navigation.navigate("Profile")
              console.log('press');
            }}
          />
          {/* <Chat width={30} height={30}/> */}
        </TouchableOpacity>
      </View>
      <Toast/>
    </View>
  );
};

export default Menuchatbar;
