import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { getUsers } from "../services/api";

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Erro ao buscar usuários", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTermLower) ||
        user.email.toLowerCase().includes(searchTermLower)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by name or email"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Procurar
        </Button>
      </div>
      <List>
        {filteredUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={user.name}
              secondary={
                <div>
                  <Typography variant="body2" component="span">
                    Email: {user.email}
                  </Typography>
                  <Typography variant="body2" component="span">
                    Role: {user.role}
                  </Typography>
                </div>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersTable;
