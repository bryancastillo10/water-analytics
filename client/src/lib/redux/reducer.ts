import { combineReducers } from "@reduxjs/toolkit";

// UI States
import userReducer from "@/lib/redux/states/userSlice"; 
import sidebarReducer from "@/lib/redux/states/sidebarSlice";
import drawerReducer from "@/lib/redux/states/drawerSlice";
import themeReducer from "@/lib/redux/states/themeSlice";

// API from RTK-Query
import { authApi } from "@/features/auth/api/authApi";
import { userApi } from "@/features/user/api/userApi";
import { sitesApi } from "@/features/sites/api/sitesApi";
import { measurementApi } from "@/features/waterquality/api/measurementApi";
import { thresholdApi } from "@/features/thresholds/api/thresholdApi";
import { stickynoteApi } from "@/features/stickynote/api/stickynoteApi";

const rootReducer = combineReducers({
  user: userReducer,
  sidebar: sidebarReducer,
  drawer: drawerReducer,
  theme: themeReducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [sitesApi.reducerPath]: sitesApi.reducer,
  [measurementApi.reducerPath]: measurementApi.reducer,
  [thresholdApi.reducerPath]: thresholdApi.reducer,
  [stickynoteApi.reducerPath]: stickynoteApi.reducer
});

export const apis = [authApi, userApi, sitesApi, measurementApi, thresholdApi, stickynoteApi];
export const apiReducerPaths = apis.map(api => api.reducerPath);

export default rootReducer;