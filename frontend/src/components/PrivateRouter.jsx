import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const isAuthenticaded = localStorage.getItem("token") ? true : false;

  return isAuthenticaded ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRouter;
