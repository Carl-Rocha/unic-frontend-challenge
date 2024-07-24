import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateUserPassword } from "../../services/api";

const TrocarSenha = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleClickShowPassword = (setShowPassword, showPassword) => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    if (!user || !user.id) {
      setError("Usuário não autenticado ou ID do usuário não disponível");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("A nova senha e a confirmação de senha não coincidem.");
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

    openConfirmationDialog(async () => {
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
    });
  };

  const openConfirmationDialog = (confirmAction) => {
    setDialogAction(() => confirmAction);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogAction(null);
  };

  const handleDialogConfirm = () => {
    if (dialogAction) {
      dialogAction();
    }
    handleDialogClose();
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
        <Typography component="h1" variant="h3">
          Meu Perfil
        </Typography>
      </Box>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead></TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Login</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 4,
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
          type={showCurrentPassword ? "text" : "password"}
          id="currentPassword"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    handleClickShowPassword(
                      setShowCurrentPassword,
                      showCurrentPassword
                    )
                  }
                  onMouseDown={handleMouseDownPassword}
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="Nova Senha"
          type={showNewPassword ? "text" : "password"}
          id="newPassword"
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    handleClickShowPassword(setShowNewPassword, showNewPassword)
                  }
                  onMouseDown={handleMouseDownPassword}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirmar Nova Senha"
          type={showConfirmPassword ? "text" : "password"}
          id="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    handleClickShowPassword(
                      setShowConfirmPassword,
                      showConfirmPassword
                    )
                  }
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          onClick={handleChangePassword}
        >
          Trocar Senha
        </Button>
      </Paper>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja trocar a senha?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDialogConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TrocarSenha;
