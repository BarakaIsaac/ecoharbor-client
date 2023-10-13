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
import DepartmentList from "./pages/dashboard/departmentlist";
import Requests from "./pages/dashboard/requests.jsx";
import Repairs from "./pages/dashboard/repairs.jsx";
import Assetrequest from "./pages/dashboard/assetrequest.jsx";
import InventoryIcon from '@mui/icons-material/Inventory';
import myassets from "./pages/dashboard/myassets";
import EmployeeList from "./pages/dashboard/EmployeeList";
import AssetDirectory from "./pages/dashboard/AssetDirectory";

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
        name: "Personal Profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Employee List",
        path: "/EmployeeList",
        element: <EmployeeList />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Department List",
        path: "/departmentlist",
        element: <DepartmentList />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Asset Directory",
        path: "/AssetDirectory",
        element: <AssetDirectory />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Asset Repairs",
        path: "/repairs",
        element: <Repairs />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Asset Requests",
        path: "/assetrequests",
        element: <Assetrequest />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Procurement Requests",
        path: "/requests",
        element: <Requests />,
      },
      {
        icon: <InventoryIcon {...icon} />,
        name: "My Assets",
        path: "/my-assets",
        element: <myassets />,
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
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
