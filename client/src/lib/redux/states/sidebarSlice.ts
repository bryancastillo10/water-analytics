import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SidebarState{
    isSidebarExpanded: boolean;
}

const initialState: SidebarState = {
    isSidebarExpanded: false
};

export const sidebarSlice = createSlice({
    name: 'sidebarToggle',
    initialState,
    reducers: {
        setIsSidebarExpanded: (state, action: PayloadAction<boolean>) => {
            state.isSidebarExpanded = action.payload;
        }
    }
})

export const { setIsSidebarExpanded } = sidebarSlice.actions;

export default sidebarSlice.reducer;