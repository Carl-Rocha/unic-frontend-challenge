import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UsersTable from "../UsersTable";

const DashboardUser = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Página Simples de Usuário
        </Typography>
        {userName ? (
          <>
            <Typography component="p" variant="body1">
              Bem-vindo(a), {userName}
            </Typography>
            <Button variant="contained" sx={{ mt: 3 }} onClick={handleLogout}>
              Sair
            </Button>
          </>
        ) : (
          <Typography component="p" variant="body1">
            Usuário não localizado
          </Typography>
        )}
      </Box>
      <UsersTable />
    </Container>
  );
};

export default DashboardUser;
