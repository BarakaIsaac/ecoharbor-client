import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./layouts/dashboard.jsx";
import Auth from "./layouts/auth.jsx";
import Modal from 'react-modal';
import "./App.css";
import {EmployeeProvider} from "./pages/dashboard/EmployeeModals/EmployeeContext.jsx";

Modal.setAppElement('#root');

function App() {
  return (
      <EmployeeProvider>
        <Routes>
          //check roles here
          //create 4 dashboards 
          {/* {employee.role="admin"? <link>assets</link> :""} */}
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
      </EmployeeProvider>
  );
}

export default App;
