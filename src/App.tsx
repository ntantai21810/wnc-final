import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppDispatch } from "./hooks/redux";
import { INotification } from "./model/notification";
import AuthProvider from "./provider/auth-provider";
import DialogProvider from "./provider/dialog-provider";
import { useGetDebitQuery, useGetTransactionQuery } from "./redux/apiSlice";
import { addNotification } from "./redux/authSlice";
import { openNotification } from "./redux/notificationSlice";
import routes from "./routes";

function App() {
  const dispatch = useAppDispatch();
  const { refetch: refetchTransaction } = useGetTransactionQuery();
  const { refetch: refetchDebit } = useGetDebitQuery();

  const router = createBrowserRouter(
    routes.map((item) => ({
      path: item.path,
      index: true,
      element: (
        <AuthProvider>
          {item.layout ? item.layout(item.element) : item.element}
        </AuthProvider>
      ),
    }))
  );

  useEffect(() => {
    const hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl("https://bankmaia.herokuapp.com/notification")
      .configureLogging(LogLevel.Information)
      .build();

    hubConnectionBuilder
      .start()
      .then(() => console.log("Connect ws ok"))
      .catch((err) => console.log(err));

    hubConnectionBuilder.on(
      "SendNotificationToUser",
      (result: INotification) => {
        console.log(result);
        dispatch(openNotification({ message: result.description }));
        dispatch(addNotification(result));

        if (result.type === "Transaction" || result.type === "Charge")
          refetchTransaction();
        if (result.type === "Debit") refetchDebit();
      }
    );
  }, [dispatch, refetchDebit, refetchTransaction]);

  return (
    <DialogProvider>
      <RouterProvider router={router} />
    </DialogProvider>
  );
}

export default App;
