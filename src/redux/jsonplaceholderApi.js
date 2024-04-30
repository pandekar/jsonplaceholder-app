import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const jsonplaceholderApi = createApi({
  reducerPath: 'jsonPlaceholderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/'}),
  tagTypes: ["jsonPlaceholderApi"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: `/users`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      }),
      providesTags: ['jsonPlaceholderApi']
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      }),
      providesTags: ['jsonPlaceholderApi']
    }),
    getPostByUserId: builder.query({
      query: (id) => ({
        url: `/users/${id}/posts`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      }),
      providesTags: ["jsonPlaceholderApi"]
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      }),
      providesTags: ["jsonPlaceholderApi"]
    }),
    getPostCommentsById: builder.query({
      query: (id) => ({
        url: `/posts/${id}/comments`,
        method: "GET",
        headers: {
          'Content-type': 'application/json'
        },
      }),
      providesTags: ["jsonPlaceholderApi"]
    }),
    getAlbumsByUserId: builder.query({
      query: (id) => ({
        url: `/users/${id}/albums`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      }),
      providesTags: ["jsonPlaceholderApi"]
    }),
    getAlbumPhotosByAlbumId: builder.query({
      query: (id) => ({
        url: `/albums/${id}/photos`,
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
      }),
      providesTags: ['jsonPlaceholderApi']
    })
  })
})

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetPostByUserIdQuery,
  useGetPostByIdQuery,
  useGetPostCommentsByIdQuery,
  useGetAlbumsByUserIdQuery,
  useGetAlbumPhotosByAlbumIdQuery,
} = jsonplaceholderApi;