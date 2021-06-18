import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TextInput, ScrollView, Button, Switch, FlatList, SectionList, Dimensions, TouchableHighlight } from 'react-native';
import reduxObj from './Redux';
import CalcButton from './CalcButton'

let Buttons = ({reduxSetter, reduxState}) => {
  let [result, setResult] = useState(false)
  let changeDisplayNum = x => {
    if(result) {
      setResult(false);  
      reduxSetter.setDisplayNum("" + x);
      if(x === ".")  reduxSetter.setDisplayNum("0.")
      return;
    }
    if(reduxState.displayNum === "-0") {reduxSetter.setDisplayNum("-" + x); return}
    if(reduxState.displayNum === "0") {reduxSetter.setDisplayNum(x); return}
    if(x === "." && reduxState.displayNum.includes("."))  return;
    else if(reduxState.displayNum === "" && x === ".") reduxSetter.setDisplayNum("0.");
    else reduxSetter.setDisplayNum(reduxState.displayNum + x);
  }
  let backSpace = () => {
    let displayNum = reduxState.displayNum;
    if(displayNum.length === 2 && displayNum[0] === "-") {reduxSetter.setDisplayNum(""); return}
    if(result) reset();
    else reduxSetter.setDisplayNum(displayNum.slice(0, displayNum.length - 1))
  }
  let reset = () => {
    setResult(false)
    reduxSetter.setDisplayNum("")
    reduxSetter.setStoredNum("")
    reduxSetter.setOperation(null)
  }
  let negPos = () => {
    let displayNum = reduxState.displayNum;
    if(displayNum[0] === "-") {reduxSetter.setDisplayNum(displayNum.substring(1,displayNum.length)); return}
    
    if(displayNum === "") {reduxSetter.setDisplayNum("-0"); return}
    reduxSetter.setDisplayNum("-" + displayNum)
  }
  let setOperation = x => {
    reduxSetter.setOperation(x)
    if(reduxState.storedNum === "") { 
      reduxSetter.setStoredNum(reduxState.displayNum)
      reduxSetter.setDisplayNum("")
      return
    }
    if(reduxState.storedNum !== "") {
      let localResult = calculate();
      reduxSetter.setOperation(x)
      reduxSetter.setStoredNum(localResult)
      return
    }
  }
  let calculate = () => {
    let operation = reduxState.operation;
    if(operation !== null) {
      let displayNum = Number(reduxState.displayNum);
      let storedNum = Number(reduxState.storedNum);
      let localResult = null;
      if(operation === "+") localResult = storedNum + displayNum ;
      if(operation === "-") localResult = storedNum - displayNum ;
      if(operation === "*") localResult = storedNum * displayNum ;
      if(operation === "/") localResult = storedNum / displayNum;
      setResult(true);
      reduxSetter.setOperation(null)
      reduxSetter.setStoredNum("")
      reduxSetter.setDisplayNum(localResult.toString())
      return localResult.toString();
    }
  }
  return (
    <View style={[ style.buttonArea,{backgroundColor: "grey"}]}>
      <View style={{justifyContent: "center", flex: 1, bottom: Dimensions.get("window").height * .025}}>
          <View style={style.buttonRow}>
              <CalcButton title="1" onPress={ () => changeDisplayNum(1)}/>
              <CalcButton title="2" onPress={ () => changeDisplayNum(2)}/>
              <CalcButton title="3" onPress={ () => changeDisplayNum(3)}/>
              <CalcButton title="+" oper={true} onPress={ () => setOperation("+")}/>
          </View>

          <View style={style.buttonRow}>
              <CalcButton title="4" onPress={ () => changeDisplayNum(4)}/>
              <CalcButton title="5" onPress={ () => changeDisplayNum(5)}/>
              <CalcButton title="6" onPress={ () => changeDisplayNum(6)}/>
              <CalcButton title="-" oper={true}  onPress={ () => setOperation("-")}/>
          </View>

          <View style={style.buttonRow}>
              <CalcButton title="7" onPress={ () => changeDisplayNum(7)}/>
              <CalcButton title="8" onPress={ () => changeDisplayNum(8)}/>
              <CalcButton title="9" onPress={ () => changeDisplayNum(9)}/>
              <CalcButton title="*" oper={true}  onPress={ () => setOperation("*")}/>
          </View>

          <View style={style.buttonRow}>
              <CalcButton title="0" onPress={ () => changeDisplayNum(0)}/>
              <CalcButton title="." onPress={ () => changeDisplayNum(".")}/>
              <CalcButton title="-/+" onPress={ () => negPos()}/>
              <CalcButton title="/" oper={true}  onPress={ () => setOperation("/")}/>
          </View>

          <View style={style.buttonRow}>
              <View style={{height: Dimensions.get("window").width/5, width: Dimensions.get("window").width/5}}/>
              <CalcButton title="CE" oper={true}  onPress={ () => reset()}/>
              <CalcButton title="C" oper={true}  onPress={ () => backSpace()}/>
              <CalcButton title="=" oper={true}  onPress={ () => calculate()}/>
          </View>
        </View>
    </View>
  )
}


const style = StyleSheet.create({
  buttonArea: {
    flexGrow: 1,
  },
  buttonRow: {
    flexDirection: "row", justifyContent: "space-evenly", paddingTop: 10
  }
})
Buttons = reduxObj.withConnect(Buttons)
export default Buttons