import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

let token = localStorage.getItem('token')
let localSlug = localStorage.getItem('slug')
export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts', 'Post'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://blog.kata.academy/api/'}),
    endpoints: (build) => ({
        getPosts: build.query({
            query: (offset) => `articles?limit=5&offset=${offset}`,
            providesTags: ['Posts']
        }),
        getPost: build.query({
            query: (slug) => {
                return {
                    url: `articles/${slug}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                }
            },
            providesTags: ['Posts']
        }),
        register: build.mutation({
            query(body) {
                return {
                    url: 'users',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['Posts']
        }),
        login: build.mutation({
            query(body) {
                return {
                    url: 'users/login',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['Posts']
        }),
        editProfile: build.mutation({
            query([body, token]) {
                return {
                    url: 'user',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Posts']
        }),
        createPost: build.mutation({
            query(body) {
                return {
                    url: 'articles',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: ['Posts']
        }),
        updatePost: build.mutation({
            query(body) {
                return {
                    url: `articles/${localSlug}`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'PUT',
                    body
                }
            },
            invalidatesTags: ['Posts']
        }),
        deletePost: build.mutation({
            query(slug) {
                return {
                    url: `articles/${slug}`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Posts']
        }),
        likePost: build.mutation({
            query([slug, token]) {
                return {
                    url: `articles/${slug}/favorite`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'POST',
                }
            },
            invalidatesTags: ['Posts']
        }),
        dislikePost: build.mutation({
            query([slug, token]) {
                return {
                    url: `articles/${slug}/favorite`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Posts']
        }),
    })
});

export const {
    useGetPostsQuery,
    useEditProfileMutation,
    useGetPostQuery,
    useRegisterMutation,
    useLoginMutation,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useDislikePostMutation,
    useLikePostMutation,
} = postsApi
