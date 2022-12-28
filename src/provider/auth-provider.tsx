import * as React from "react";
import { matchRoutes, useLocation, useNavigate } from "react-router-dom";
import { axiosClient } from "../configs/axios";
import { RBAC } from "../constants/role";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
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
        const res = await axiosClient.get("/Account/me");

        dispatch(
          setAuth({
            ...res.data,
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
