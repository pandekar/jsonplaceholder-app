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
    postComment: builder.mutation({
      query: (data) => ({
        url: `/posts/${data.postId}/comments`,
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          body: data.body,
        })
      }),
      invalidatesTags: ['jsonPlaceholderApi']
    }),
    putComment: builder.mutation({
      query: (data) => ({
        url: `/posts/${data.postId}/comments/${data.commentId}`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          id: data.commentId,
          postId: data.postId,
          name: data.name,
          email: data.email,
          body: data.body,
        })
      }),
      invalidatesTags: ['jsonPlaceholderApi']
    }),
    postPost: builder.mutation({
      query: (data) => ({
        url: '/posts',
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          title: data.title,
          body: data.body,
          userId: data.userId
        })
      }),
      invalidatesTags: ['jsonPlaceholderApi']
    }),
    putPost: builder.mutation({
      query: (data) => ({
        url: `/posts/${data.id}`,
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          id: data.id,
          title: data.title,
          body: data.body,
          userId: data.userId
        })
      }),
      invalidatesTags: ['jsonPlaceholderApi']
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['jsonPlaceholderApi']
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
  usePostCommentMutation,
  usePutCommentMutation,
  usePostPostMutation,
  usePutPostMutation,
  useDeletePostMutation,
  useGetAlbumsByUserIdQuery,
  useGetAlbumPhotosByAlbumIdQuery,
} = jsonplaceholderApi;