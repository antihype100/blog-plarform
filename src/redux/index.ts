import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from "./reducers/postsApi";
import pageReducer from './reducers/paginationSlice'

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        page: pageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch