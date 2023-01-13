import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import axios from "axios";
import * as React from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { RBAC } from "../constants/role";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { INotification } from "../model/notification";
import { TRole } from "../model/role";
import { useGetDebitQuery, useGetTransactionQuery } from "../redux/apiSlice";
import { addNotification, logout, setAuth } from "../redux/authSlice";
import { openNotification } from "../redux/notificationSlice";
import routes from "../routes/index";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const { refetch: refetchTransaction } = useGetTransactionQuery();
  const { refetch: refetchDebit } = useGetDebitQuery();
  const authState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const route = matchRoutes(routes, location);
  const pathName = route ? route[0].route.path : "";
  const isValidAccess = !!RBAC[authState.role as TRole]?.find(
    (item) => item.url === pathName
  );

  React.useEffect(() => {
    const _getMe = async () => {
      try {
        let notifications: INotification[] = [];
        const res = await axios.get(
          "https://bankmaia.herokuapp.com/api/Account/me",
          { withCredentials: true }
        );

        if (res.data.role !== "Admin")
          try {
            const resNoti = await axios.get(
              "https://bankmaia.herokuapp.com/api/Account/me/notifications",
              { withCredentials: true }
            );

            notifications = resNoti.data;
          } catch (e) {
            console.log(e);
          }

        dispatch(
          setAuth({
            ...res.data,
            notification: notifications,
            status: "authenticated",
          })
        );
      } catch (e) {
        dispatch(logout());
        console.log(e);
      }
    };

    _getMe();
  }, [dispatch]);

  React.useEffect(() => {
    if (!isValidAccess && authState.status === "unauthenticate") {
      navigate("/login");
    }
  });

  React.useEffect(() => {
    if (authState.id) {
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

      return () => {
        hubConnectionBuilder.stop();
      };
    }
  }, [authState.id, dispatch, refetchDebit, refetchTransaction]);

  if (isValidAccess) return <>{children}</>;
  else return <div>Forbidden</div>;
}
