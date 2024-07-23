import axios from "axios";

// Cria o cliente axios
const apiClient = axios.create({
  baseURL: "https://unic-frontend-challenge-server.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Adiciona um interceptor para incluir o token em todas as requisições
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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

export const getUsers = async (searchTerm) => {
  try {
    const response = await apiClient.get(`/users?q=${searchTerm}`);
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
    const response = await apiClient.put(
      `users/change-password/${id}`,
      { currentPassword, newPassword },
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

export const updateUser = async (id, data) => {
  try {
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar usuário", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar usuário", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await apiClient.post("/users", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar usuário", error);
    throw error;
  }
};
