import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const authenticateUser = async (email, password) => {
  try {
    const response = await apiClient.post("/auth", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Ocorreu um erro na autenticação", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID", error);
    throw error;
  }
};

export const updateUserPassword = async (id, newPassword) => {
  try {
    const user = await getUserById(id);
    user.password = newPassword;
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar a senha do usuário", error);
    throw error;
  }
};
