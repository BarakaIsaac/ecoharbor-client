import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StorageIcon from '@mui/icons-material/Storage';
import HandymanIcon from '@mui/icons-material/Handyman';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

import { Profile } from "./pages/dashboard/Profile";
import { Home } from "./pages/dashboard/home";
import { SignIn } from "./pages/auth/sign-in";
import { SignUp } from "./pages/auth/sign-up";
import DepartmentList from "./pages/dashboard/DepartmentList";
import AssetRepair from "./pages/dashboard/AssetRepair.jsx";
import AssetRequest from "./pages/dashboard/AssetRequest.jsx";
import InventoryIcon from '@mui/icons-material/Inventory';
import MyAssets from "./pages/dashboard/MyAssets";
import EmployeeList from "./pages/dashboard/EmployeeList";
import AssetDirectory from "./pages/dashboard/AssetDirectory";
import AssetValuation from "./pages/dashboard/AssetValuation";

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
        path: "/Profile",
        element: <Profile />,
      },
      {
        icon: <InventoryIcon {...icon} />,
        name: "My Assets",
        path: "/MyAssets",
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
        icon: <RequestQuoteIcon {...icon} />,
        name: "Asset Requests",
        path: "/AssetRequest",
        element: <AssetRequest />,
      },
      {
        icon: <HandymanIcon {...icon} />,
        name: "Asset Repairs",
        path: "/AssetRepair",
        element: <AssetRepair />,
      },
      {
        icon: <ShoppingBagIcon {...icon} />,
        name: "Asset Valuation",
        path: "/AssetValuation",
        element: <AssetValuation />,
      },
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

export const roleBasedRoutes = {
  Admin: [
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
          path: "/Profile",
          element: <Profile />,
        },
        // Add other pages accessible by Admin
      ],
    },
  ],
  FinanceManager: [
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
          path: "/Profile",
          element: <Profile />,
        },
        // Add other pages accessible by Finance Manager
      ],
    },
  ],
  ProcurementManager: [
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
          path: "/Profile",
          element: <Profile />,
        },
        // Add other pages accessible by Procurement Manager
      ],
    },
  ],
  Employee: [
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
          path: "/Profile",
          element: <Profile />,
        },
        // Add other pages accessible by Employee
      ],
    },
  ],
};

export function getEmployeeRole() {
  const role = localStorage.getItem("role");
  if (role === "Employee") {
    return "Employee";
  } else if (role === "FinanceManager") {
    return "Finance Manager";
  } else if (role === "ProcurementManager") {
    return "Procurement Manager";
  } else {
    return "Admin";
  }

}

export default routes;


