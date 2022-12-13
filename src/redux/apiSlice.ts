// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;

      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    //Users
    // getUsers: builder.query<IUser[], void>({
    //   query: () => `user/get_all_users`,
    //   providesTags: ['User'],
    // }),
    // addUser: builder.mutation<
    //   IUser & { password?: string },
    //   IUserFormData & { url: string }
    // >({
    //   query: ({ url, ...user }) => ({
    //     url,
    //     method: 'POST',
    //     body: user,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
  }),
});

export const {} = appApi;
