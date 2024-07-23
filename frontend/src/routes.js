import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {
  LoginPage,
  DashboardAdmin,
  DashboardUser,
  TrocarSenha,
  EditUser,
  CreateUser,
} from "./pages/index";
import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/create-user";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-user" element={<CreateUser />} />
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
        <Route
          path="/editar-usuario"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/user" />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
