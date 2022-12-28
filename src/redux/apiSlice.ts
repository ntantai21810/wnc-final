// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../model/account";
import { IRecipient } from "../model/recipient";
import { IRecipientFormData } from "../schema/recipient";

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bankmaia.herokuapp.com/api/",
    credentials: "include",
    // prepareHeaders: (headers, { getState }) => {
    //   const accessToken = (getState() as RootState).auth.accessToken;

    //   if (accessToken) {
    //     headers.set("Authorization", `Bearer ${accessToken}`);
    //   }

    //   return headers;
    // },
  }),
  tagTypes: ["Account", "Recipient"],
  endpoints: (builder) => ({
    // Account
    getAccounts: builder.query<IAccount[], void>({
      query: () => `Account`,
      providesTags: ["Account"],
    }),
    // addUser: builder.mutation<
    //   IUser & { password?: string },
    //   IUserFormData & { url: string }
    // >({
    //   query: ({ url, ...user }) => ({
    //     url,
    //     method: "POST",
    //     body: user,
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    //Recipient
    getRecipient: builder.query<IRecipient[], void>({
      query: () => `Account/me/my-recipients`,
      providesTags: ["Recipient"],
    }),
    addRecipient: builder.mutation<IRecipient, IRecipientFormData>({
      query: (data) => ({
        url: "Account/me/add-my-recipient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recipient"],
    }),
    editRecipient: builder.mutation<
      IRecipient,
      IRecipientFormData & { id: number }
    >({
      query: (data) => ({
        url: "Account/me/edit-my-recipient",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Recipient"],
    }),
    deleteRecipient: builder.mutation<IRecipient, number>({
      query: (id) => ({
        url: `Account/me/my-recipients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipient"],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetRecipientQuery,
  useAddRecipientMutation,
  useEditRecipientMutation,
  useDeleteRecipientMutation,
} = appApi;
