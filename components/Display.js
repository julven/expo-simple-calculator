import * as React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import reduxObj from './Redux'


let Display = ({reduxState }) => {
  

  return (
     <View style={[style.display]}>
        <Text style={{flex: 1}}>{reduxState.storedNum} {reduxState.operation}</Text>
        <Text style={style.displayNum}>{reduxState.displayNum === "" ? "0" : reduxState.displayNum}</Text>
      </View>
  )
}

const style = StyleSheet.create({

  display: {
    height: Dimensions.get("window").height * 0.2,
    justifyContent: "flex-end",
    flexDirection: "column",
    backgroundColor: "lightgrey",
    paddingRight: 10
    
  },
  displayNum: {
    alignSelf: "flex-end",
    fontSize: 60
  }
  
});

Display = reduxObj.withConnect(Display)

export default Display