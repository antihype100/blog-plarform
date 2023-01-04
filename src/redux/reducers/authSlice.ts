import {createSlice} from "@reduxjs/toolkit";

export interface IAuthState {
    isLogin: boolean
}

const initialState: IAuthState = {
    isLogin: false
}

export const authSlice = createSlice({
    name: 'isLogin',
    initialState,
    reducers: {
        login(state) {
            state.isLogin = true
        },
        logout(state) {
            state.isLogin = false
        },

    }


})

export const {logout, login} = authSlice.actions

export default authSlice.reducer
