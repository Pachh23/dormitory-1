import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";
const MainPages = Loadable(lazy(() => import("../pages/authentication/LoginStudent")));
const Homepages = Loadable(lazy(() => import("../pages/homepage")));
const Personal = Loadable(lazy(() => import("../pages/personal")));
const PersonalCreate = Loadable(lazy(() => import("../pages/personal/create")));

const StudentRoutes = (isLoggedInStudent : boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedInStudent ? <FullLayout /> : <MainPages />,
    children: [
      {
        path: "/",
        element: <Homepages />,
      },
      {
        path: "/personal",
        children: [
          {
            path: "/personal",
            element: <Personal />,
          },
          {
            path: "/personal/create",
            element: <PersonalCreate />,
          },
        ],
      },
    ],
  };
};
export default StudentRoutes;