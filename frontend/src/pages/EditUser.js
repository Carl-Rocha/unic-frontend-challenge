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
} from "@mui/material";
import { getUsers, updateUser } from "../services/api"; // Ajuste o caminho conforme necessário
import { useAuth } from "../context/AuthContext";

const UsersTable = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
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
        setError(""); // Limpa o erro se a busca for bem-sucedida
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
            setError(""); // Limpa o erro ao digitar
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
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useAuth();

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

        <UsersTable onSelectUser={handleSelectUser} />

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
      </Box>
    </Container>
  );
};

export default EditUser;
