import { combineReducers } from "@reduxjs/toolkit";

// UI States
import userReducer from "@/lib/redux/states/userSlice"; 
import sidebarReducer from "@/lib/redux/states/sidebarSlice";
import drawerReducer from "@/lib/redux/states/drawerSlice";

// API from RTK-Query
import { authApi } from "@/features/auth/api/authApi";
import { userApi } from "@/features/user/api/userApi";
import { sitesApi } from "@/features/sites/api/sitesApi";
import { measurementApi } from "@/features/waterquality/api/measurementApi";

const rootReducer = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
  drawer: drawerReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [sitesApi.reducerPath]: sitesApi.reducer,
  [measurementApi.reducerPath]: measurementApi.reducer
});

export const apis = [authApi, userApi, sitesApi, measurementApi];

export default rootReducer;