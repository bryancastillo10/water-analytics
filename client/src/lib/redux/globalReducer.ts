import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; 


const globalReducer = combineReducers({
  user: userReducer,
});


export default globalReducer;