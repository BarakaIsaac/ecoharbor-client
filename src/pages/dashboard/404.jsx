import React from 'react';
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>You are not authorized to access this page</h1>
            <button onClick={() => navigate("/dashboard/home")}>BACK</button>
        </div>
    );
};

export default ErrorPage;
