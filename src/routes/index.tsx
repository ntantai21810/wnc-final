import { ReactNode } from "react";
import AdminLayout from "../layouts/admin-layout";
import InfoPage from "../pages/Info";
import ChangePasswordPage from "../pages/ChangePassword";
import DebitPage from "../pages/Debit";
import DebitActionPage from "../pages/Debit/action";
import ForgotPasswordPage from "../pages/ForgotPassword";
import Homepage from "../pages/Homepage";
import LogoutPage from "../pages/Logout";
import RecipientPage from "../pages/Recipient";
import RecipientActionPage from "../pages/Recipient/action";
import SigninPage from "../pages/Sign-in";
import TransactionPage from "../pages/Transaction";
import TransactionActionPage from "../pages/Transaction/action";
import AccountPage from "../pages/Account";
import AccountActionPage from "../pages/Account/action";
import AccountTransactionPage from "../pages/Account/transaction";
import StaffPage from "../pages/Staff";
import StaffActionPage from "../pages/Staff/action";
import AdminTransactionPage from "../pages/AdminTransaction";

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
  {
    path: "/debit",
    element: <DebitPage />,
    layout: AdminLayout,
  },
  {
    path: "/debit/:id",
    element: <DebitActionPage />,
    layout: AdminLayout,
  },
  {
    path: "/change-password",
    element: <ChangePasswordPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/account",
    element: <AccountPage />,
    layout: AdminLayout,
  },
  {
    path: "/account/:id",
    element: <AccountActionPage />,
    layout: AdminLayout,
  },
  {
    path: "/account/:id/transaction",
    element: <AccountTransactionPage />,
    layout: AdminLayout,
  },
  {
    path: "/staff",
    element: <StaffPage />,
    layout: AdminLayout,
  },
  {
    path: "/staff/:id",
    element: <StaffActionPage />,
    layout: AdminLayout,
  },
  {
    path: "/list-transaction",
    element: <AdminTransactionPage />,
    layout: AdminLayout,
  },
];

export default routes;
