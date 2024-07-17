import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
