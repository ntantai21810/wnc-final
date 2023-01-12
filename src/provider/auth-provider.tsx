import axios from "axios";
import * as React from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { RBAC } from "../constants/role";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { INotification } from "../model/notification";
import { TRole } from "../model/role";
import { logout, setAuth } from "../redux/authSlice";
import routes from "../routes/index";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
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
              "https://bankmaia.herokuapp.com/api/Account/me/notifications"
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

  if (isValidAccess) return <>{children}</>;
  else return <div>Forbidden</div>;
}
