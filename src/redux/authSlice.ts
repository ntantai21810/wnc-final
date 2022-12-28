import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAccount } from "../model/account";
import { TRole } from "../model/role";

export interface IAuthState extends IAccount {
  status: "authenticating" | "authenticated" | "unauthenticate";
  role: TRole;
}

export const initialState: IAuthState = {
  id: 0,
  status: "authenticating",
  accountNumber: 0,
  fullName: "",
  balance: 0,
  email: "",
  role: "",
  isActive: true,
  recipients: [],
  bankAccountId: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuthState>) => {
      return action.payload;
    },
    updateAuth: (state, action: PayloadAction<Partial<IAuthState>>) => {
      return { ...state, ...action.payload };
    },
    logout: (_) => {
      return {
        ...initialState,
        status: "unauthenticate",
      };
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setAuth, logout, updateAuth } = authSlice.actions;
