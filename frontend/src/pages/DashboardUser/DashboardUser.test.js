import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import DashboardUser from "./DashboardUser";
import { useAuth } from "../../context/AuthContext";

// Mock do módulo de contexto AuthContext
jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

// Mock do componente UsersTable
jest.mock("../../components/UsersTable", () => () => (
  <div>UsersTable Component</div>
));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("DashboardUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("redirects to /login if not authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter>
        <DashboardUser />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("renders user name if authenticated and userName is in localStorage", async () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    localStorage.setItem("userName", "Test User");

    render(
      <MemoryRouter>
        <DashboardUser />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Bem-vindo\(a\), Test User/i)
      ).toBeInTheDocument();
    });
  });

  test("renders 'Usuário não localizado' if authenticated but no userName in localStorage", async () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    localStorage.removeItem("userName");

    render(
      <MemoryRouter>
        <DashboardUser />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Usuário não localizado/i)).toBeInTheDocument();
    });
  });

  test("renders UsersTable component", () => {
    useAuth.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <DashboardUser />
      </MemoryRouter>
    );

    expect(screen.getByText("UsersTable Component")).toBeInTheDocument();
  });
});
