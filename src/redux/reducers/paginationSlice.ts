import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PageState {
    page: number
}

const initialState: PageState = {
    page: 1
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        increment(state) {
            state.page += 1
        },
        decrement(state) {
            state.page -= 1
        },
        setPageGlobal(state, action: PayloadAction<number>) {
            state.page = action.payload
        }
    }


})

export const {increment, decrement, setPageGlobal} = pageSlice.actions

export default pageSlice.reducer
