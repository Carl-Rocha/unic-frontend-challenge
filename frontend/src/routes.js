import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  LoginPage,
  DashboardAdmin,
  DashboardUser,
  TrocarSenha,
} from "./pages/index";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
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
          path="/trocar-senha"
          element={
            <ProtectedRoute>
              <TrocarSenha />
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
        <Route path="/" element={<Navigate to="/user" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
