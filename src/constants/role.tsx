import AtmIcon from "@mui/icons-material/Atm";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PaidIcon from "@mui/icons-material/Paid";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import SettingsIcon from "@mui/icons-material/Settings";
import { IBasePageRole, IPageRole } from "../model/page";
import { TRole } from "../model/role";

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
      icon: <PeopleAltIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/staff/:id",
      discriminatedType: "base",
    },
    {
      url: "/list-transaction",
      label: "Transaction",
      icon: <PaidIcon fontSize="small" />,
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
      icon: <PeopleAltIcon fontSize="small" />,
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
      url: "/recipient/:id",
      discriminatedType: "base",
    },
    {
      url: "/recipient",
      label: "Recipients",
      icon: <RecentActorsIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/transaction",
      label: "Transaction",
      icon: <PaidIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/transaction/:id",
      discriminatedType: "base",
    },
    {
      url: "/debit",
      label: "Debit",
      icon: <AtmIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/debit/:id",
      discriminatedType: "base",
    },
    {
      url: "/info",
      label: "Setting",
      icon: <SettingsIcon fontSize="small" />,
      discriminatedType: "full",
    },
  ],
};
