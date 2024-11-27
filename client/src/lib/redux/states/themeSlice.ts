import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
        setIsDarkMode(state, action: PayloadAction<boolean>) {
            state.isDarkMode = action.payload;
        }
    }
});

export const { setIsDarkMode } = themeSlice.actions;

export default themeSlice.reducer;