import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./layouts/dashboard.jsx";
import Auth from "./layouts/auth.jsx";
import Modal from 'react-modal';
import {AuthProvider} from "./pages/auth/auth-context.jsx";
Modal.setAppElement('#root');



function App() {
  return (
      <AuthProvider>
        <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
