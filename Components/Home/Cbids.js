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
                  source={require('../../Images/Animation - 1722075556252.json')}
                  autoPlay
                  loop={true}
                  speed={0.5}
                />
              </View>

              <View style={tw` items-center justify-around w-80 h-30 self-center flex-row `}>
                <View
                  style={[tw`shadow-xl w-30 h-30 items-center justify-center self-center`, { backgroundColor: '#00B1E7' }]}>
                  <Text style={tw`text-white text-lg font-bold`}>Today Appointment</Text>

                  <Text style={tw`text-lg text-white`}>{"10"}</Text>
                </View>

                <View
                  style={[tw`shadow-xl bg-blue-500 w-30 h-30  items-center justify-center self-center`, { backgroundColor: '#00B1E7' }]}>
                  <Text style={tw`text-white text-lg font-bold`}>My Total {'\n'}Doctors</Text>
                  <Text style={tw`text-lg text-white`}>{"10"}</Text>
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
