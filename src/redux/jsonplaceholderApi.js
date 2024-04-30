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
    })
  })
})

export const {
  useGetUsersQuery,
} = jsonplaceholderApi;