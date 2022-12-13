import { ReactNode } from "react";
import AdminLayout from "../layouts/admin-layout";
import Homepage from "../pages/Homepage";

interface IRoute {
  label: string;
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
];

export default routes;
