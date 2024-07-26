import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
// import { AppContext } from '../../AppContext';
import tw from 'twrnc'
import Screensheader from '../Universal/Screensheader';
import LinearGradient from 'react-native-linear-gradient';
import { showToast } from '../Universal/Input';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Sessions = ({ navigation }) => {
  const [Data, setdata] = useState([])
  const [Data1, setdata1] = useState([])
  const [token, settoken] = useState("")
  const [loading, setloading] = useState(true)
  const [cat,setcat] = useState ("All Videos")
  

  const vrImages = [
    "https://vection-cms-prod.s3.eu-central-1.amazonaws.com/Adobe_Stock_506941973_cc825880a8.jpeg",
    "https://images.inc.com/uploaded_files/image/1920x1080/getty_921019710_413686.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxppOK6lXDXS0sAPzkkXzgeEvERi9EwdBre_AcvFHkX1kwufIiS1qFpDCiDsKKcWkdrwQ&usqp=CAU",
    "https://imageio.forbes.com/specials-images/imageserve/5f239af66507ee97a5379ffa/These-3-Business-Functions-Could-Be-Transformed-By-VR/960x0.jpg?height=474&width=711&fit=bounds",
    "https://jacoblund.com/cdn/shop/products/photo-id-2000512876613-business-team-using-virtual-reality-headset-in-meeting_1200x800.jpg?v=1563897567",
    "https://media.hswstatic.com/eyJidWNrZXQiOiJjb250ZW50Lmhzd3N0YXRpYy5jb20iLCJrZXkiOiJnaWZcL1ZSLXVzZXMuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo4Mjh9fX0=",
    "https://www.glueup.com/storage/app/uploads/public/5f3/65e/8ea/5f365e8ea741c038111951.jpg"
  ];


  useFocusEffect(
    React.useCallback(() => {
      const checkUserRole = async () => {
        AsyncStorage.getItem("token").then((token) => {
          settoken(token)
          getinfo(token)
          getallvideo(token)

          console.log(token);

        })
      };
      checkUserRole();
      return () => { };
    }, []) // Empty dependency array ensures this runs only on focus and cleanup on blur
  );


  const getinfo = async (token) => {

    try {

      const response = await fetch('https://vr.evolvsolution.com/api/category', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Replace YOUR_TOKEN_HERE with the actual token
        },
      });

      const result = await response.json();
      if (response.ok) {

        console.log('Request successful:', result);
        // navigation.navigate('Subplan')
        console.log("result :", result.data);
        setdata(result.data)


      } else {

        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {

      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };
  // const { state } = useContext(AppContext);
  const getcatvideo = async (id) => {

    try {
       setloading(true)
      const response = await fetch(`https://vr.evolvsolution.com/api/category/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Replace YOUR_TOKEN_HERE with the actual token
        },
      });

      const result = await response.json();
      if (response.ok) {

        console.log('Request successful:', result);
        // navigation.navigate('Subplan')
        console.log("result :", result.data);
        const newdata = [result.data]
        console.log("result2:", newdata);
        setdata1(newdata)
        setloading(false)

      } else {
        setloading(false)
        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {
      setloading(false)
      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };

  const getallvideo = async (token) => {

    try {

      const response = await fetch(`https://vr.evolvsolution.com/api/category/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Replace YOUR_TOKEN_HERE with the actual token
        },
      });

      const result = await response.json();
      if (response.ok) {

        console.log('Request successful:', result);
        // navigation.navigate('Subplan')
        console.log("result :", result.data);
        
        setdata1(result.data)
        setloading(false)

      } else {
        setloading(false)
        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {
      setloading(false)
      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <Screensheader
        name={'YOUR SESSION'}
        left={15}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      {/* {
                state.cart.map((item, index) => ( */}


      <>

        <View
          style={tw`w-85 h-12   flex-row  self-center  items-center`}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* card 1 */}

            <>
            <TouchableOpacity
                  // key={index}
                  onPress={() => {
                     setloading(true)
                     getallvideo(token)
                     setcat("All Videos")
                  }}>
                  <View style={[tw`bg-${cat === "All Videos" ? 'green-500' : "white"} h-10 w-30 ml-5 border flex-row items-center justify-evenly rounded-3xl`, { borderRadius: 50, borderColor: '#199A8E' }]}>
                    <Image style={tw`h-5 w-5 rounded-full`} source={{ uri: vrImages[0] }} />
                    <Text numberOfLines={1} style={tw`text-center w-20`}>{"All Videos"}</Text>
                  </View>
                </TouchableOpacity>

              {Data?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                     setloading(true)
                     getcatvideo(item.id)
                     setcat(item.id)
                  }}>
                  <View style={[tw`bg-${cat === item.id ? 'green-500' : 'white'} h-10 w-20 ml-5 border flex-row items-center justify-evenly rounded-3xl`, { borderRadius: 50, borderColor: '#199A8E' }]}>
                    <Image style={tw`h-5 w-5 rounded-full`} source={{ uri: item.image }} />
                    <Text numberOfLines={1} style={tw`text-center w-12`}>{item.name}</Text>
                  </View>
                </TouchableOpacity>

              ))
              }




            </>


          </ScrollView>
        </View>
      </>
      <View >

        {
          loading ?
            <ActivityIndicator style={tw`justify-center items-center mt-40`} size="large" color="#199A8E" /> :
            <ScrollView vertical showsVerticalScrollIndicator={true}>
              <View style={tw` self-center flex-1 mb-50 `}>
                {Data1?.map((item, index) => (
                  item.video.map((items, index) => (
                    items.type === 'Mobile' &&
                    <>
                      <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Showvideo',{
                          video : items.video
                        });
                      }}
                      >
                        <View style={[tw`h-50 mt-5 w-80 border `, { borderColor: '#199A8E', borderTopLeftRadius: 50, borderBottomRightRadius: 50 }]}>
                          <Image
                            style={[tw`w-79  h-30`, { borderTopLeftRadius: 50 }]}
                            source={{
                              uri: `https://vr.evolvsolution.com/storage/app/public/${items.image}`,
                            }}
                            resizeMode="cover"
                          />
                          <View
                            style={[tw`h-15 w-70  self-start items-center justify-center border-b-2   rounded-xl`, { borderColor: '#199A8E' }]}>


                            <View style={tw`flex-col w-65 justify-between self-center`}>
                              <Text
                                numberOfLines={1}
                                style={[tw`mt-1 w-60 text-base font-medium text-gray-400`]}>
                                Session Title: {items.title}
                              </Text>
                              <Text
                                style={tw`mt-1  text-base text-gray-400 font-medium`}>

                                Category: {item.name}

                              </Text>
                            </View>
                          </View>

                        </View>
                      </TouchableOpacity>


                    </>
                  ))
                ))}
              </View>
            </ScrollView>
        }

      </View>
      {/* ))
            } */}


    </View>
  )
}

export default Sessions