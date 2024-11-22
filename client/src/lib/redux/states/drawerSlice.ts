import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface DrawerState{
    isOpenDrawer: boolean;
    title: string;
    body: React.ReactNode | null;
}

const initialState: DrawerState = {
    isOpenDrawer: false,
    title: "",
    body:null
}

export const drawerSlice = createSlice({
    name: 'drawerToggle',
    initialState,
    reducers: {
        openDrawer(state, action: PayloadAction<{ title: string; body:React.ReactNode}>) {
            state.isOpenDrawer = true;
            state.title = action.payload.title;
            state.body = action.payload.body;
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