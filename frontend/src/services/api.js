import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://unic-frontend-challenge-server.vercel.app/",
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

export const getUsers = async (searchTerm, token) => {
  try {
    const response = await apiClient.get(`/users?q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

export const updateUserPassword = async (
  id,
  currentPassword,
  newPassword,
  token
) => {
  try {
    const response = await apiClient.post(
      `users/change-password`,
      {
        id,
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar a senha do usuário", error);
    throw error;
  }
};

export const updateUser = async (id, data, token) => {
  try {
    const response = await apiClient.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    throw error;
  }
};
