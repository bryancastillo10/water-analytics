import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import type { ComponentType } from "react";

interface DrawerState{
    isOpenDrawer: boolean;
    title: string;
    componentName: string | null;
    bodyProps?: Record<string,any>;
}

const initialState: DrawerState = {
    isOpenDrawer: false,
    title: "",
    componentName:"",
    bodyProps: {}
}

export const drawerSlice = createSlice({
    name: 'drawerToggle',
    initialState,
    reducers: {
        openDrawer(state, action: PayloadAction<{
            title: string;
            componentName: string;
            bodyProps: object;
        }>) {
            state.isOpenDrawer = true;
            state.title = action.payload.title;
            state.componentName = action.payload.componentName;
            state.bodyProps = action.payload.bodyProps;
        },
        closeDrawer(state) {
            state.isOpenDrawer = false;
            state.title = "";
            state.componentName = null;
        }
    }
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;