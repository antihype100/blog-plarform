import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from "./reducers/postsApi";
import pageReducer from './reducers/paginationSlice'
import authReducer from './reducers/authSlice'

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        page: pageReducer,
        isLogin: authReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch