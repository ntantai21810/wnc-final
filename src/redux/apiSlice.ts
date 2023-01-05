// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../model/account";
import { IBank } from "../model/bank";
import { IDebit } from "../model/debit";
import { IRecipient } from "../model/recipient";
import { ITransaction } from "../model/transaction";
import { IDebitFormData, IDeleteDebitFormData } from "../schema/debit";
import { IRecipientFormData } from "../schema/recipient";
import { ITransactionFormData } from "../schema/transaction";

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
  tagTypes: ["Account", "Recipient", "Bank", "Transaction", "Debit"],
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
    addRecipient: builder.mutation<IRecipient, Partial<IRecipientFormData>>({
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

    //Bank
    getBank: builder.query<IBank[], void>({
      query: () => `Bank`,
      providesTags: ["Bank"],
    }),

    //Transaction
    getTransaction: builder.query<ITransaction[], void>({
      query: () => `Account/me/transactions`,
      providesTags: ["Transaction"],
    }),
    addTransaction: builder.mutation<
      ITransaction,
      Partial<ITransactionFormData>
    >({
      query: (data) => ({
        url: "Account/me/transfer-money",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),

    //Debit
    getDebit: builder.query<IDebit[], void>({
      query: () => `Account/me/debits`,
      providesTags: ["Debit"],
    }),
    addDebit: builder.mutation<IDebit, IDebitFormData>({
      query: (data) => ({
        url: "Account/me/debits",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Debit"],
    }),
    deleteDebit: builder.mutation<
      IDebit,
      IDeleteDebitFormData & { id: number }
    >({
      query: ({ id, ...data }) => ({
        url: `Account/me/debits/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Debit"],
    }),
    payDebit: builder.mutation<IDebit, { id: number; otp: string }>({
      query: (data) => ({
        url: `Account/me/debits/pay`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Debit"],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetRecipientQuery,
  useAddRecipientMutation,
  useEditRecipientMutation,
  useDeleteRecipientMutation,
  useGetBankQuery,
  useGetTransactionQuery,
  useAddTransactionMutation,
  useGetDebitQuery,
  useAddDebitMutation,
  useDeleteDebitMutation,
  usePayDebitMutation,
} = appApi;
