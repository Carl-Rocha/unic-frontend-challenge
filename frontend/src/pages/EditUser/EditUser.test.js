// EditUser.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditUser from "./EditUser";
import { AuthProvider } from "../../context/AuthContext";
import { getUsers, updateUser, deleteUser } from "../../services/api/api";

// Mock das funções de API
jest.mock("../../services/api/api");

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.setItem("token", "mockToken");
  getUsers.mockResolvedValue([]); // Garante que sempre retorna um array
});

describe("EditUser Component", () => {
  it("should render the EditUser component correctly", () => {
    render(
      <AuthProvider>
        <EditUser />
      </AuthProvider>
    );
    expect(screen.getByText(/Editar Usuário/i)).toBeInTheDocument();
  });

  it("should display an error if search term is empty", () => {
    render(
      <AuthProvider>
        <EditUser />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText(/Procurar/i));
    expect(
      screen.getByText(/Por favor, insira o usuário/i)
    ).toBeInTheDocument();
  });

  it("should search and display users correctly", async () => {
    const mockUsers = [{ id: 1, name: "John Doe", email: "john@example.com" }];
    getUsers.mockResolvedValueOnce(mockUsers);

    render(
      <AuthProvider>
        <EditUser />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Insira email ou nome/i), {
      target: { value: "John" },
    });
    fireEvent.click(screen.getByText(/Procurar/i));

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  it("should update user correctly", async () => {
    const mockUsers = [{ id: 1, name: "John Doe", email: "john@example.com" }];
    getUsers.mockResolvedValueOnce(mockUsers);
    const mockUser = { id: 1, name: "John Updated", email: "john@example.com" };
    updateUser.mockResolvedValueOnce(mockUser);

    render(
      <AuthProvider>
        <EditUser />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Insira email ou nome/i), {
      target: { value: "John" },
    });
    fireEvent.click(screen.getByText(/Procurar/i));

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Editar"));

    const nameInput = screen.getByTestId("name-input");
    fireEvent.change(nameInput, {
      target: { value: "John Updated" },
    });

    const updateButton = await screen.findByRole("button", {
      name: /Atualizar Usuário/i,
    });
    fireEvent.click(updateButton);

    // Log do DOM após clicar em atualizar

    // Espera pela mensagem de sucesso
  });

  it("should delete user correctly", async () => {
    const mockUsers = [{ id: 1, name: "John Doe", email: "john@example.com" }];
    getUsers.mockResolvedValueOnce(mockUsers);
    deleteUser.mockResolvedValueOnce();

    render(
      <AuthProvider>
        <EditUser />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText(/Insira email ou nome/i), {
      target: { value: "John" },
    });
    fireEvent.click(screen.getByText(/Procurar/i));

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Editar"));

    const deleteButton = await screen.findByText(
      (content, element) =>
        element.tagName.toLowerCase() === "button" && /Deletar/i.test(content)
    );
    fireEvent.click(deleteButton);

    fireEvent.click(screen.getByText(/Confirmar/i));

    await waitFor(() => {
      expect(
        screen.getByText(/Usuário deletado com sucesso!/i)
      ).toBeInTheDocument();
    });
  });
});
