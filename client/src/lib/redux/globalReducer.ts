import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/lib/redux/states/userSlice"; 
import sidebarReducer from "@/lib/redux/states/sidebarSlice";

const globalReducer = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer
});


export default globalReducer;