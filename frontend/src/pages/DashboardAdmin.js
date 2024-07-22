import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UsersTable from "../components/UsersTable";

const DashboardAdmin = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
          Painel admin
        </Typography>
        {userName ? (
          <>
            <Typography component="p" variant="body1">
              Bem-vindo(a), {userName}
            </Typography>
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

export default DashboardAdmin;
