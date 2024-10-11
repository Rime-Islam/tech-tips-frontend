import { RootState } from "@/redux/app/store";
import { createSlice } from "@reduxjs/toolkit";


type TAuthSlice = {
    user: null | IUser;
    token: null | string;
};

const initialState: TAuthSlice = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { userData, token } = action.payload;
            state.user = userData;
            state.token = token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;


export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;