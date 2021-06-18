import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, Switch, FlatList, SectionList, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native';

let CalcButton = (props) => {
  return (
    <TouchableOpacity onPress={() => {props.onPress()}} style={[style.button, {backgroundColor: props.oper ? "orange": "lightgrey"}]}>
      <View>
        <Text style={{fontSize: 30}}>{props.title}</Text>
     
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  button: {
    height: Dimensions.get("window").width/5, 
    width: Dimensions.get("window").width/5, 
    backgroundColor: "#DDDDDD", 
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 50
  }
})

export default CalcButton;