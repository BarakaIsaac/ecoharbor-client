import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Profile } from "./pages/dashboard/profile";
import { Tables } from "./pages/dashboard/tables";
import { Home } from "./pages/dashboard/home";
import { Department } from "./pages/dashboard/department";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import Assetdirectory from "./pages/dashboard/assetdirectory";
import Requests from "./pages/dashboard/requests.jsx";
import Repairs from "./pages/dashboard/repairs.jsx";
import Assetrequest from "./pages/dashboard/assetrequest.jsx";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "tables",
        path: "/tables",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Repairs",
        path: "/repairs",
        element: <Repairs />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Requests",
        path: "/requests",
        element: <Requests />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Asset Directory",
        path: "/assetdirectory",
        element: <Assetdirectory />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Asset Requests",
        path: "/assetrequests",
        element: <Assetrequest />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Department List",
        path: "/department",
        element: <Department />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Asset Directory",
        path: "/asset-directory",
        element: <Assetdirectory />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
