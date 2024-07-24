import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { AuthContext } from "../../context/AuthContext";

// Mock do módulo do contexto
jest.mock("../../context/AuthContext");

const mockAuthContext = {
  login: jest.fn(),
  user: null,
  isAuthenticated: false,
  logout: jest.fn(),
};

test("renders LoginPage and submits form", async () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // Simula a entrada do email
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });

  // Simula a entrada da senha
  fireEvent.change(screen.getByLabelText(/Senha/i), {
    target: { value: "password" },
  });

  // Simula o clique no botão de login
  fireEvent.click(screen.getByRole("button", { name: /Login/i }));

  // Aguarda a chamada da função login
  await waitFor(() => {
    expect(mockAuthContext.login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
  });
});
