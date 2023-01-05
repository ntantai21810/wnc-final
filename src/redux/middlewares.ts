import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { store } from "./store";
import { openNotification } from "./notificationSlice";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      store.dispatch(
        openNotification({
          type: "error",
          message: action.payload?.data?.Message || "Unexpected error.",
        })
      );

      if (action.payload?.status === 401) {
      }
    }

    return next(action);
  };
