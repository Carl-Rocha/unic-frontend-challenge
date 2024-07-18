import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3001", // Base URL da sua API
  headers: {
    "Content-Type": "application/json",
  },
});

export const authenticateUser = async (email, password) => {
  try {
    const response = await apiClient.get("/users", {
      params: {
        email,
        password,
      },
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
    const response = await apiClient.get("/users", {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID", error);
    throw error;
  }
};
