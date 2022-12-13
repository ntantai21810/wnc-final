import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRole } from "../model/role";
import { IUser } from "../model/user";

export interface IAuthState extends Omit<IUser, "role"> {
  status: "authenticating" | "authenticated" | "unauthenticate";
  accessToken: string;
  role: TRole | "";
  email?: string;
}

export const initialState: IAuthState = {
  id: 0,
  status: "authenticating",
  name: "",
  role: "",
  organization_id: 0,
  user_id: "",
  accessToken: "",
  email: "",
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
