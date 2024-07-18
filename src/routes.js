import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  LoginPage,
  DashboardAdmin,
  DashboardUser,
} from "./components/pages/index";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <DashboardUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
