// TrocarSenha.js
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateUserPassword } from "../../services/api";

const TrocarSenha = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleChangePassword = async () => {
    if (!user || !user.id) {
      setError("Usuário não autenticado ou ID do usuário não disponível");
      return;
    }

    if (!currentPassword || !newPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("A nova senha deve ser diferente da atual.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      await updateUserPassword(user.id, currentPassword, newPassword, token);
      setSuccess("Senha trocada com sucesso!");
      setError("");
      alert("Senha trocada com sucesso!");
      navigate("/user");
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao trocar senha");
      setSuccess("");
    }
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
          Trocar Senha
        </Typography>
        {error && (
          <Typography color="error" component="p">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" component="p">
            {success}
          </Typography>
        )}
        <TextField
          margin="normal"
          required
          fullWidth
          name="currentPassword"
          label="Senha Atual"
          type="password"
          id="currentPassword"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="Nova Senha"
          type="password"
          id="newPassword"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleChangePassword}
        >
          Trocar Senha
        </Button>
      </Box>
    </Container>
  );
};

export default TrocarSenha;
