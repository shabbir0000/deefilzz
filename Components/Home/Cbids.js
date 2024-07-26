import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../Screens/Universal/Input';
import { useFocusEffect } from '@react-navigation/native';


const Cbids = ({ navigation }) => {
  const [userflag, setuserflag] = useState(false);
  const [loading, setloading] = useState(false);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
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
        setname(result.data.subscription.name)
       

      } else {
   
        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {
    
      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };


  return (
    <>
      {
        loading ?
          <ActivityIndicator style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }} size={'large'} />
          :
          userflag ?
            <></>
            :
            <View style={tw` w-80 self-center mt-10 h-190`}>
              <View style={tw`mt-10 h-70 w-80 border-black items-center self-center `}>

                <LottieView
                  style={tw`self-center  w-60 h-60`}
                  source={require('../../Images/Animation - 1716899497112.json')}
                  autoPlay
                  loop={true}
                  speed={0.5}
                />
              </View>

              <View style={tw` items-center justify-around w-80 h-30 self-center flex-row `}>
                <View
                  style={[tw`shadow-xl w-25 h-20 items-center justify-center self-center`, { backgroundColor: '#199A8E' }]}>
                  <Text style={tw`text-white text-xs`}>Active Plan</Text>

                  <Text style={tw`text-lg text-white`}>{name}</Text>
                </View>

                <View
                  style={[tw`shadow-xl bg-blue-500 w-25 h-20  items-center justify-center self-center`, { backgroundColor: '#199A8E' }]}>
                  <Text style={tw`text-white text-xs`}>Subscription</Text>
                  <Text style={tw`text-lg text-white`}>{"1 Month"}</Text>
                </View>

                {/* <View
                style={[tw`shadow-xl w-25 h-20 items-center justify-center self-center`, { borderTopRightRadius: 30 ,backgroundColor:'#199A8E'}]}>
                <Text style={tw`text-white`}>Today Orders</Text>
                <Text style={tw`text-lg`}>{GetData1.length}</Text>
              </View> */}

              </View>
            </View>
      }
    </>

  );
};

export default Cbids;
