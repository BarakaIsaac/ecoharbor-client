import { useLocation, Link } from "react-router-dom";
import { Navbar, Typography, Button, IconButton, Breadcrumbs,  Avatar,} from "@material-tailwind/react";
import { UserCircleIcon, Bars3Icon,} from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav,} from "/src/context";
import {SignOutButton} from "../../pages/auth/signout.jsx";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

    // Retrieve first_name, last_name, and image URL from localStorage
  const first_name = localStorage.getItem("first_name");
  const last_name = localStorage.getItem("last_name");
  const userImage = localStorage.getItem("employee_image");
  const defaultImage = "data:image/png;base64,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";

  return (
    <Navbar color={fixedNavbar ? "white" : "transparent"} className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}  fullWidth blurred={fixedNavbar} >
      
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs className={`bg-transparent p-0 transition-all ${ fixedNavbar ? "mt-1" : "" }`} >
            <Link to={`/${layout}`}>
              <Typography variant="small" color="blue-gray" className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100" >
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" color="blue-gray" className="font-normal"> {page}</Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">{page}</Typography>
        </div>
<div className="flex items-center justify-between">
  <div>
    <img
      src={defaultImage}
      alt="Image"
      className="h-10 w-10 rounded-full object-cover"
    />
  </div>
  <Typography variant="h6" color="black" className="ml-2">
    {`${first_name} ${last_name}`}
  </Typography>
</div>
        <div className="flex items-center">
          <IconButton variant="text" color="blue-gray" className="grid xl:hidden" onClick={() => setOpenSidenav(dispatch, !openSidenav)} >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          <Link to="/auth/sign-in">
            <Button variant="text" color="blue-gray" className="hidden items-center gap-1 px-4 xl:flex" onClick={SignOutButton} >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" /> SIGN OUT
            </Button>
            <IconButton variant="text" color="blue-gray" className="grid xl:hidden"  >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />        
            </IconButton>
          </Link>
        </div>      

      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
