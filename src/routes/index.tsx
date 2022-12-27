import { ReactNode } from "react";
import AdminLayout from "../layouts/admin-layout";
import Homepage from "../pages/Homepage";
import LogoutPage from "../pages/Logout";
import SigninPage from "../pages/Sign-in";

interface IRoute {
  label?: string;
  path: string;
  element: ReactNode;
  layout?: typeof AdminLayout;
}

const routes: IRoute[] = [
  {
    label: "Home page",
    path: "/",
    element: <Homepage />,
    layout: AdminLayout,
  },
  {
    label: "Sign in page",
    path: "/login",
    element: <SigninPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
];

export default routes;
