import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./provider/auth-provider";
import routes from "./routes";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useAppDispatch } from "./hooks/redux";
import { openNotification } from "./redux/notificationSlice";

function App() {
  const dispatch = useAppDispatch();

  const router = createBrowserRouter(
    routes.map((item) => ({
      path: item.path,
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
      (result: { id: number; description: string; time: string }) => {
        dispatch(openNotification({ message: result.description }));
      }
    );
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
