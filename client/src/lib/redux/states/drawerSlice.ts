import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ComponentType } from "react";

interface DrawerState{
    isOpenDrawer: boolean;
    title: string;
    body: ComponentType<any> | null;
    bodyProps?: object;
}

const initialState: DrawerState = {
    isOpenDrawer: false,
    title: "",
    body: null,
    bodyProps: {}
}

export const drawerSlice = createSlice({
    name: 'drawerToggle',
    initialState,
    reducers: {
        openDrawer(state, action: PayloadAction<{
            title: string;
            body: ComponentType<any>;
            bodyProps: object;
        }>) {
            state.isOpenDrawer = true;
            state.title = action.payload.title;
            state.body = action.payload.body;
            state.bodyProps = action.payload.bodyProps;
        },
        closeDrawer(state) {
            state.isOpenDrawer = false;
            state.title = "";
            state.body = null;
        }
    }
});

export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;