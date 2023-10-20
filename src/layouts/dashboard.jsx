import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {DashboardNavbar} from "../widgets/layout/dashboard-navbar";
import {  Sidenav } from "../widgets/layout/sidenav";
import routes from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import Configurator from "../widgets/layout/configurator";
import {EmployeeProvider} from "../pages/dashboard/EmployeeModals/EmployeeContext.jsx";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
      <EmployeeProvider>
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png" }/>
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton size="lg" color="white" className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10" ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}>
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
        </div>
      </div>
    </div>
    </EmployeeProvider>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
