import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";

export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      // store.dispatch(
      //   openNotification({
      //     type: "error",
      //     message: action.payload?.data?.Message || "Unexpected error.",
      //   })
      // );
      // if (action.payload?.status === 401) {
      // }
    }

    return next(action);
  };
