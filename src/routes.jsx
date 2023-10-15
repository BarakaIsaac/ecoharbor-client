import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StorageIcon from '@mui/icons-material/Storage';
import HandymanIcon from '@mui/icons-material/Handyman';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import { Profile } from "./pages/dashboard/profile";
// import { Tables } from "./pages/dashboard/tables";
import { Home } from "./pages/dashboard/home";
import { Department } from "./pages/dashboard/department";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import DepartmentList from "./pages/dashboard/departmentlist";
import Requests from "./pages/dashboard/requests.jsx";
import Repairs from "./pages/dashboard/repairs.jsx";
import Assetrequest from "./pages/dashboard/assetrequest.jsx";
import InventoryIcon from '@mui/icons-material/Inventory';
import MyAssets from "./pages/dashboard/myassets";
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
        icon: <InventoryIcon {...icon} />,
        name: "My Assets",
        path: "/my-assets",
        element: <MyAssets />,
      },
      {
        icon: <PeopleAltIcon {...icon} />,
        name: "Employee List",
        path: "/EmployeeList",
        element: <EmployeeList />,
      },
      {
        icon: <HomeWorkIcon {...icon} />,
        name: "Department List",
        path: "/departmentlist",
        element: <DepartmentList />,
      },
      {
        icon: <StorageIcon {...icon} />,
        name: "Asset Directory",
        path: "/AssetDirectory",
        element: <AssetDirectory />,
      },
      {
        icon: <HandymanIcon {...icon} />,
        name: "Asset Repairs",
        path: "/repairs",
        element: <Repairs />,
      },
      {
        icon: <RequestQuoteIcon {...icon} />,
        name: "Asset Requests",
        path: "/assetrequests",
        element: <Assetrequest />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "Procurement Requests",
        path: "/requests",
        element: <Requests />,
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
        icon: <LoginIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <LogoutIcon {...icon} />,
        name: "Log Out",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
