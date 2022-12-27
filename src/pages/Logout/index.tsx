import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { appApi } from "../../redux/apiSlice";
import { logout } from "../../redux/authSlice";

export interface ILogoutPageProps {}

export default function LogoutPage(props: ILogoutPageProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const _logout = React.useCallback(async () => {
    try {
      dispatch(appApi.util.resetApiState());
      dispatch(logout());
      navigate("/login", { replace: true });
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, navigate]);

  React.useEffect(() => {
    _logout();
  }, [_logout]);
  return <div></div>;
}
