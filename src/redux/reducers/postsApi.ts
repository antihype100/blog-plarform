import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

let token = localStorage.getItem('token')
let localSlug = localStorage.getItem('slug')
export const postsApi = createApi({
    reducerPath: 'postsApi',
    tagTypes: ['Posts'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://blog.kata.academy/api/'}),
    endpoints: (build) => ({
        getPosts: build.query({
            query: (offset) => `articles?limit=5&offset=${offset}`,
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
            }
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
            }
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
            }
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
            }
        }),
        likePost: build.mutation({
            query(slug) {
                return {
                    url: `articles/${slug}/favorite`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'POST',
                }
            }
        }),
        dislikePost: build.mutation({
            query(slug) {
                return {
                    url: `articles/${slug}/favorite`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'DELETE',
                }
            }
        }),
        getLikedPost: build.query({
            query(offset) {
                return {
                    url: `articles/feed?limit=5&offset=${offset}`,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization' : `Bearer ${token}`
                    },
                    method: 'GET',
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
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useDislikePostMutation,
    useLikePostMutation,
    useGetLikedPostQuery
} = postsApi
