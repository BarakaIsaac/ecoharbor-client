import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StorageIcon from '@mui/icons-material/Storage';
import HandymanIcon from '@mui/icons-material/Handyman';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

// import { Profile } from "./pages/dashboard/Profile";
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
import AssetDirectory2 from "./pages/dashboard/AssetDirectory2";

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
        employee_role: []
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "Personal Profile",
      //   path: "/Profile",
      //   element: <Profile />,
      // },
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
        icon: <StorageIcon {...icon} />,
        name: "Asset Directory2",
        path: "/AssetDirectory2",
        element: <AssetDirectory2 />,
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

// export const roleBasedRoutes = {
//   Admin: [
//     {
//       layout: "dashboard",
//       pages: [
//         {
//           icon: <HomeIcon {...icon} />,
//           name: "dashboard",
//           path: "/home",
//           element: <Home />,
//         },
//         {
//           icon: <InventoryIcon {...icon} />,
//           name: "My Assets",
//           path: "/MyAssets",
//           element: <MyAssets />,
//         },
//         {
//           icon: <PeopleAltIcon {...icon} />,
//           name: "Employee List",
//           path: "/EmployeeList",
//           element: <EmployeeList />,
//         },
//         {
//           icon: <HomeWorkIcon {...icon} />,
//           name: "Department List",
//           path: "/departmentlist",
//           element: <DepartmentList />,
//         },
//         {
//           icon: <HandymanIcon {...icon} />,
//           name: "Asset Repairs",
//           path: "/AssetRepair",
//           element: <AssetRepair />,
//         },
//       ],
//     },
//   ],
//   FinanceManager: [
//     {
//       layout: "dashboard",
//       pages: [
//         {
//           icon: <HomeIcon {...icon} />,
//           name: "dashboard",
//           path: "/home",
//           element: <Home />,
//         },
//         // {
//         //   icon: <UserCircleIcon {...icon} />,
//         //   name: "Personal Profile",
//         //   path: "/Profile",
//         //   element: <Profile />,
//         // },
//         {
//           icon: <InventoryIcon {...icon} />,
//           name: "My Assets",
//           path: "/MyAssets",
//           element: <MyAssets />,
//         },
//         {
//           icon: <StorageIcon {...icon} />,
//           name: "Asset Directory",
//           path: "/AssetDirectory",
//           element: <AssetDirectory />,
//         },
//         {
//           icon: <RequestQuoteIcon {...icon} />,
//           name: "Asset Requests",
//           path: "/AssetRequest",
//           element: <AssetRequest />,
//         },
//         {
//           icon: <HandymanIcon {...icon} />,
//           name: "Asset Repairs",
//           path: "/AssetRepair",
//           element: <AssetRepair />,
//         },
//         {
//           icon: <ShoppingBagIcon {...icon} />,
//           name: "Asset Valuation",
//           path: "/AssetValuation",
//           element: <AssetValuation />,
//         },
//       ],
//     },
//   ],
//   ProcurementManager: [
//     {
//       layout: "dashboard",
//       pages: [
//         {
//           icon: <HomeIcon {...icon} />,
//           name: "dashboard",
//           path: "/home",
//           element: <Home />,
//         },
//         // {
//         //   icon: <UserCircleIcon {...icon} />,
//         //   name: "Personal Profile",
//         //   path: "/Profile",
//         //   element: <Profile />,
//         // },
//         {
//           icon: <InventoryIcon {...icon} />,
//           name: "My Assets",
//           path: "/MyAssets",
//           element: <MyAssets />,
//         },
//         {
//           icon: <StorageIcon {...icon} />,
//           name: "Asset Directory",
//           path: "/AssetDirectory",
//           element: <AssetDirectory />,
//         },
//         {
//           icon: <HandymanIcon {...icon} />,
//           name: "Asset Repairs",
//           path: "/AssetRepair",
//           element: <AssetRepair />,
//         },
//         {
//           icon: <RequestQuoteIcon {...icon} />,
//           name: "Asset Requests",
//           path: "/AssetRequest",
//           element: <AssetRequest />,
//         },
//       ],
//     },
//   ],
//   Employee: [
//     {
//       layout: "dashboard",
//       pages: [
//         {
//           icon: <HomeIcon {...icon} />,
//           name: "dashboard",
//           path: "/home",
//           element: <Home />,
//         },
//         // {
//         //   icon: <UserCircleIcon {...icon} />,
//         //   name: "Personal Profile",
//         //   path: "/Profile",
//         //   element: <Profile />,
//         // },
//         {
//           icon: <InventoryIcon {...icon} />,
//           name: "My Assets",
//           path: "/MyAssets",
//           element: <MyAssets />,
//         },
//         {
//           icon: <HandymanIcon {...icon} />,
//           name: "Asset Repairs",
//           path: "/AssetRepair",
//           element: <AssetRepair />,
//         },
//       ],
//     },
//   ],
// };

// export function getEmployeeRole() {
//   const role = localStorage.getItem("employee_role"); //check if window is undefined. 

//   if (role === "0") {
//     return "Employee";
//   } else if (role === "2") {
//     return "Finance Manager";
//   } else if (role === "1") {
//     return "Procurement Manager";
//   } else (role === "3")
//   {
//     return "Admin";
//   }

// }
export default routes;


