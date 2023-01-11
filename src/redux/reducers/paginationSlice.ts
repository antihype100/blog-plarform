import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface PageState {
    page: number,
    maxPages: number
}

const initialState: PageState = {
    page: 1,
    maxPages: 3
}

export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        increment(state) {
            if (state.page === state.maxPages) {

            } else {
                state.page += 1
            }

        },
        decrement(state) {
            state.page -= 1
        },
        setPageGlobal(state, action: PayloadAction<number>) {

            state.page = action.payload
        },
        setMaxCountPages(state, action: PayloadAction<number>) {
            state.maxPages = action.payload
        }

    }


})

export const {increment, decrement, setPageGlobal, setMaxCountPages} = pageSlice.actions

export default pageSlice.reducer
