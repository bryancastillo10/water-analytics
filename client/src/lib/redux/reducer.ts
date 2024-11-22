import { combineReducers } from "@reduxjs/toolkit";

// UI States
import userReducer from "@/lib/redux/states/userSlice"; 
import sidebarReducer from "@/lib/redux/states/sidebarSlice";
import drawerReducer from "@/lib/redux/states/drawerSlice";

// API from RTK-Query
import { authApi } from "@/features/auth/api/authApi";


const rootReducer = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
  drawer: drawerReducer,
  [authApi.reducerPath]: authApi.reducer
});

export const apis = [authApi];

export default rootReducer;