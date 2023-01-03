import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


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
    })
});

export const {useGetPostsQuery, useGetPostQuery} = postsApi
