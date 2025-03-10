import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const localKey = localStorage.getItem("sb-arhqdstuioabzeolisnj-auth-token");

  const location = useLocation();

  return localKey ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthRoute;
