import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./layouts/dashboard.jsx";
import { useNavigate } from "react-router-dom";
import Auth from "./layouts/auth.jsx";
import { useEffect } from 'react';
import ErrorPage from "./pages/dashboard/404.jsx";
import "./App.css";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const islogged = localStorage.getItem('isLoggedIn');

  const navigate = useNavigate();

  useEffect(() => {
  
  if (!islogged){
    navigate("/auth/sign-in");
    }
    else {
      navigate("/dashboard/home");
    }

 }, []);

  return (

        <Routes>
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
          <Route path="/not-allowed" element={<ErrorPage />} />
        </Routes>

  );
}

export default App;
