import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, Switch, FlatList, SectionList, Dimensions } from 'react-native';
import Buttons from "./Buttons"
import Display from "./Display"
import reduxObj from './Redux';

let Index = ({reduxState}) => {
  
  return (
    <View style={[style.screen]}>
      <Display />
      <Buttons />
    </View>
  )
}

const style = StyleSheet.create({
  screen: {
    ...{height: Dimensions.get("window").height, borderColor: "gray", borderWidth: 1}
  }
});

Index = reduxObj.withConnect(Index)

export default Index