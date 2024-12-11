import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    user_id: string | null;
    username: string;
    email: string;
    profilePic: string;
    role: string;
}

const initialState: UserState = {
    user_id: null,
    username: '',
    email:'',
    profilePic:'',
    role:'',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user_id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.profilePic = action.payload.profilePic;
            state.role = action.payload.role;
        },
        setUserInfo: (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        setProfilePic: (state, action) => {
            state.profilePic = action.payload;  
        },
        clearUser: (state) => {
            state.user_id = null,
            state.username = '',
            state.email = '',
            state.profilePic = '',
            state.role = ''
        },
    }
});

export const { setUser, setUserInfo, setProfilePic, clearUser } = userSlice.actions;

export default userSlice.reducer;