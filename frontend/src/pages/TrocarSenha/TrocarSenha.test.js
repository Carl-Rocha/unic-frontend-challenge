import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import TrocarSenha from "./TrocarSenha";
import { useAuth } from "../../context/AuthContext";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../services/api/api", () => ({
  updateUserPassword: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("TrocarSenha", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders TrocarSenha component", () => {
    useAuth.mockReturnValue({
      isAuthenticated: true,
      user: {
        id: 1,
        name: "Test User",
        email: "test@example.com",
        role: "user",
      },
    });

    render(
      <MemoryRouter>
        <TrocarSenha />
      </MemoryRouter>
    );

    expect(screen.getByText(/Meu Perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Role/i)).toBeInTheDocument();
  });
});
