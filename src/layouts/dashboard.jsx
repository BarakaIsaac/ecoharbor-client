import { Routes, Route } from "react-router-dom";
import {DashboardNavbar} from "../widgets/layout/dashboard-navbar";
import {  Sidenav } from "../widgets/layout/sidenav";
import routes from "../routes";
import { useMaterialTailwindController, setOpenConfigurator } from "../context";
import Configurator from "../widgets/layout/configurator";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;


  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav routes={routes} brandImg={sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png" }/>
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />

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
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
