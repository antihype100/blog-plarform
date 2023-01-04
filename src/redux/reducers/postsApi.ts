import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

let token = localStorage.getItem('token')
export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://blog.kata.academy/api/'}),
    endpoints: (build) => ({
        getPosts: build.query({
            query: (offset) => `articles?limit=5&offset=${offset}`,
        }),
        getPost: build.query({
            query: (slug) => `articles/${slug}`
        }),
        register: build.mutation({
            query(body) {
                return {
                    url: 'users',
                    method: 'POST',
                    body
                }
            }
        }),
        login: build.mutation({
            query(body) {
                return {
                    url: 'users/login',
                    method: 'POST',
                    body
                }
            }
        }),
        editProfile: build.mutation({
            query(body) {
                return {
                    url: 'user',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'PUT',
                    body
                }
            }
        }),
    })
});

export const {
    useGetPostsQuery,
    useEditProfileMutation,
    useGetPostQuery,
    useRegisterMutation,
    useLoginMutation,
} = postsApi
