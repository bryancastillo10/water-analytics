import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
    isDarkMode: boolean;
}

const initialState: ThemeState = {
    isDarkMode:false
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setIsDarkMode(state) {
            state.isDarkMode = true;
        }
    }
});

export const { setIsDarkMode } = themeSlice.actions;

export default themeSlice.reducer;