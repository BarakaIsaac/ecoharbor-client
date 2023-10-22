import { Routes, Route } from "react-router-dom";
import {DashboardNavbar} from "../widgets/layout/dashboard-navbar";
import {  Sidenav } from "../widgets/layout/sidenav";
import routes, { roleBasedRoutes, getEmployeeRole } from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import Configurator from "../widgets/layout/configurator";
import {EmployeeProvider} from "../pages/dashboard/EmployeeModals/EmployeeContext.jsx";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const role = getEmployeeRole();
  const selectedRoutes = roleBasedRoutes[role] || [];

  return (
      <EmployeeProvider>
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png" }/>
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />

        <Routes>
          {selectedRoutes.map(({ layout, pages }) =>
              pages.map(({ path, element }) => (
                  <Route key={path} exact path={path} element={element} />
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
