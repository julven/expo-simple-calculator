import React, {useEffect} from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, Switch, FlatList, SectionList, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import Index from './components/Index'
import reduxObj from './components/Redux'
import {OrientationLock, lockAsync} from 'expo-screen-orientation'
// import * as ScreenOrientation from 'expo-screen-orientation'

export default function App() {

  useEffect(  () => {
    //  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    lockAsync(OrientationLock.PORTRAIT)
  },[])

  return (
    <SafeAreaView>
      <StatusBar translucent />
      { Platform.OS == "android" && <View style={{height: StatusBar.currentHeight, backgroundColor: "gray"}} /> }
       
      <Provider store={reduxObj.reduxStore} context={reduxObj.reduxContext}>
        <View>
           
            <Index/>          
        </View>
      </Provider>
    </SafeAreaView>
   
  );
}
