import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RBAC } from "../constants/role";
import { useAppSelector } from "../hooks/redux";
import { TRole } from "../model/role";

interface IAuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: IAuthProviderProps) {
  const authState = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const isValidAccess = !!RBAC[authState.role as TRole]?.find(
    (item) => item.url === pathName
  );

  React.useEffect(() => {
    if (!isValidAccess && authState.status === "unauthenticate") {
      navigate("/sign-in");
    }
  });

  if (isValidAccess) return <>{children}</>;
  else return <div>Forbidden</div>;
}
