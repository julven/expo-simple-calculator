import React, {createContext,} from 'react';
import {createStore, compose } from 'redux';
import {Provider, connect} from 'react-redux';

let reduxState = {
  test: "test",
  displayNum: "",
  storedNum: "", 
  operation: null,
};

let reduxReducer = (state = reduxState, {type, payload}) => {
  switch (type) {
    case "SET_TEST":
    return {
      ...state,
      test: payload
    }
    case "SET_DISPLAY_NUM":
      return {
        ...state,
        displayNum: payload
      };
    case "SET_STORED_NUM":
      return {
        ...state,
        storedNum: payload
      };
    case "SET_OPERATION":
      return {
        ...state,
        operation: payload
      };
    default: 
      return state;
  }
}

let reduxContext = createContext();
let reduxStore = createStore(reduxReducer);

let withConnect = ( Component ) => {
  let mapReduxStateToProps = state => {
    return {reduxState: state}
  }

  let mapReduxDispatchToProps = dispatch => {
    return {
      reduxSetter: {
        setTest: data => { dispatch ({type: "SET_TEST", payload: data})},
        setDisplayNum: data => { dispatch ({type: "SET_DISPLAY_NUM", payload: data})},
        setStoredNum: data => { dispatch ({type: "SET_STORED_NUM", payload: data})},
        setOperation: data => { dispatch ({type: "SET_OPERATION", payload: data})},
      }
    }
  }

  Component = compose(
    connect(mapReduxStateToProps, mapReduxDispatchToProps, null, {context: reduxContext}),

  ) (Component)

  return Component;
}

const reduxObj = {
  reduxState,
  reduxReducer,
  reduxContext,
  reduxStore,
  withConnect
};

export default reduxObj
