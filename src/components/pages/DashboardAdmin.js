import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUsers } from "../../services/api";

const DashboardUser = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
          const users = await getUsers();
          const user = users.find((u) => u.id === storedUserId);
          if (user) {
            setUserName(user.name);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = () => {
    logout();
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
          Painel Admin
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
            Carregando...
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default DashboardUser;
