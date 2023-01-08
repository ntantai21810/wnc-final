import { IBasePageRole, IPageRole } from "../model/page";
import { TRole } from "../model/role";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";

export const RBAC: Record<TRole | "", (IBasePageRole | IPageRole)[]> = {
  "": [
    {
      url: "/login",
      discriminatedType: "base",
    },
    {
      url: "/logout",
      discriminatedType: "base",
    },
    {
      url: "/forgot-password",
      discriminatedType: "base",
    },
  ],
  Admin: [
    {
      url: "/login",
      discriminatedType: "base",
    },
    {
      url: "/logout",
      discriminatedType: "base",
    },
    {
      url: "/",
      label: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/staff",
      label: "Staff",
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/staff/:id",
      discriminatedType: "base",
    },
    {
      url: "/list-transaction",
      label: "Transaction",
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: "full",
    },
  ],
  Employee: [
    {
      url: "/login",
      discriminatedType: "base",
    },
    {
      url: "/logout",
      discriminatedType: "base",
    },
    {
      url: "/change-password",
      discriminatedType: "base",
    },
    {
      url: "/forgot-password",
      discriminatedType: "base",
    },
    {
      url: "/",
      label: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/account",
      label: "Account",
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/account/:id",
      discriminatedType: "base",
    },
    {
      url: "/account/:id/transaction",
      discriminatedType: "base",
    },
  ],
  User: [
    {
      url: "/login",
      discriminatedType: "base",
    },
    {
      url: "/logout",
      discriminatedType: "base",
    },
    {
      url: "/change-password",
      discriminatedType: "base",
    },
    {
      url: "/forgot-password",
      discriminatedType: "base",
    },
    {
      url: "/",
      label: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/info",
      label: "Setting",
      icon: <GroupIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/recipient/:id",
      discriminatedType: "base",
    },
    {
      url: "/recipient",
      label: "Recipients",
      icon: <GroupIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/transaction",
      label: "Transaction",
      icon: <GroupIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/transaction/:id",
      discriminatedType: "base",
    },
    {
      url: "/debit",
      label: "Debit",
      icon: <GroupIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/debit/:id",
      discriminatedType: "base",
    },
  ],
};
