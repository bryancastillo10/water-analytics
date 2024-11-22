import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "@/lib/redux/states/userSlice"; 
import sidebarReducer from "@/lib/redux/states/sidebarSlice";
import drawerReducer from "@/lib/redux/states/drawerSlice";

const globalReducer = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
  drawer: drawerReducer
});


export default globalReducer;