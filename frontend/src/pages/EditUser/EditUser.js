import React, { useState } from "react";
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
} from "@mui/material";
import { getUsers, updateUser, deleteUser } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const UsersTable = ({
  onSelectUser,
  onDeleteUser,
  filteredUsers,
  setFilteredUsers,
  openConfirmationDialog,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Por favor, insira o usuário");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token não fornecido");
      return;
    }

    try {
      const usersData = await getUsers(searchTerm, token);
      if (usersData.length === 0) {
        setError("Usuário não localizado");
        setFilteredUsers([]);
      } else {
        setFilteredUsers(usersData);
        setError("");
      }
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
      setError("Erro ao buscar usuários");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Insira email ou nome"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setError("");
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Procurar
        </Button>
      </div>
      {error && (
        <Typography
          variant="body2"
          color="error"
          style={{ marginBottom: "20px" }}
        >
          {error}
        </Typography>
      )}
      {filteredUsers.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button onClick={() => onSelectUser(user)}>Editar</Button>
                    <Button
                      onClick={() =>
                        openConfirmationDialog("delete", () =>
                          onDeleteUser(user.id)
                        )
                      }
                      color="error"
                    >
                      Deletar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

const EditUser = () => {
  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
    role: "",
  });
  const [user, setUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useAuth();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Nenhum usuário selecionado para edição.");
      return;
    }
    try {
      await updateUser(user.id, form, token);
      setSuccess("Usuário atualizado com sucesso!");
      setError("");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      setError("Erro ao atualizar usuário.");
    }
  };

  const handleSelectUser = (selectedUser) => {
    setUser(selectedUser);
    setForm(selectedUser);
    setError("");
    setSuccess("");
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId, token);
      setSuccess("Usuário deletado com sucesso!");
      setError("");

      setFilteredUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      setError("Erro ao deletar usuário.");
    }
  };

  const openConfirmationDialog = (action, confirmAction) => {
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
        <Typography component="h1" variant="h5">
          Editar Usuário
        </Typography>

        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}

        <UsersTable
          onSelectUser={handleSelectUser}
          onDeleteUser={handleDeleteUser}
          filteredUsers={filteredUsers}
          setFilteredUsers={setFilteredUsers}
          openConfirmationDialog={openConfirmationDialog}
        />

        {user && (
          <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h2" variant="h6">
                Informações do Usuário
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="name"
                  label="Nome"
                  value={form.name}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  value={form.password}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="role"
                  label="Role"
                  value={form.role}
                  onChange={handleInputChange}
                />
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                  Atualizar Usuário
                </Button>
              </form>
            </Box>
          </Paper>
        )}

        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Você tem certeza disso?
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
      </Box>
    </Container>
  );
};

export default EditUser;
