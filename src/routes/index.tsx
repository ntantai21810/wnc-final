import { ReactNode } from "react";
import AdminLayout from "../layouts/admin-layout";
import InfoPage from "../pages/Account";
import Homepage from "../pages/Homepage";
import LogoutPage from "../pages/Logout";
import RecipientPage from "../pages/Recipient";
import RecipientActionPage from "../pages/Recipient/action";
import SigninPage from "../pages/Sign-in";
import TransactionPage from "../pages/Transaction";
import TransactionActionPage from "../pages/Transaction/action";

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
  {
    path: "/info",
    element: <InfoPage />,
    layout: AdminLayout,
  },
  {
    path: "/recipient",
    element: <RecipientPage />,
    layout: AdminLayout,
  },
  {
    path: "/recipient/:id",
    element: <RecipientActionPage />,
    layout: AdminLayout,
  },
  {
    path: "/transaction",
    element: <TransactionPage />,
    layout: AdminLayout,
  },
  {
    path: "/transaction/:id",
    element: <TransactionActionPage />,
    layout: AdminLayout,
  },
];

export default routes;
