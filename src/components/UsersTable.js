import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getUsers } from "../services/api";

const UsersTable = () => {
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
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default UsersTable;
