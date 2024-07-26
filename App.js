import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navigation from './Screens/Universal/Navigation'
import Navigationwl from './Screens/Universal/Navigationwl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { showToast } from './Screens/Universal/Input'

const App = () => {
  // const mobileid = DeviceInfo.getUniqueId();
  const [id, setid] = useState(false)
  const [flag, setflag] = useState(true)

 
  const getinfo = async (token, id) => {

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
        // navigation.navigate('Subplan')
        if (result.data.subscription === null) {
          setid(false)
          setflag(false)
        }
        else {
          if (id) {
            setid(true)
            setflag(false)
          }
          else {
            setid(false)
            setflag(false)
          }

        }

      } else {

        showToast("error", "Error", response.status === 401 ? result.message : result.errors[0], true, 3000);
      }
    } catch (error) {

      showToast("error", "Error", error, true, 3000);
      console.error('Catch Error:', error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("mobileid").then((id) => {
      AsyncStorage.getItem("token").then((token) => {
         if (token && id) {
          getinfo(token, id)
         }
         else{
          setid(false)
          setflag(false)
         }
       
      })
    })
  }, [])

  
  return (
    <>
      {
        flag ?
          <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} size={'large'} />
          :
          id ?

            <Navigation />

            :

            <Navigationwl />

      }

    </>
  )
}


export default App