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
      url: "/",
      label: "Dashboard",
      icon: <DashboardIcon fontSize="small" />,
      discriminatedType: "full",
    },
    {
      url: "/accounts",
      label: "Accounts",
      icon: <GroupIcon fontSize="small" />,
      discriminatedType: "full",
    },
  ],
};
