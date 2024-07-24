import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import DashboardAdmin from "./DashboardAdmin";
import { useAuth } from "../../context/AuthContext";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../components/UsersTable", () => () => (
  <div>UsersTable Component</div>
));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("DashboardAdmin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders DashboardAdmin component", () => {
    useAuth.mockReturnValue({ isAuthenticated: true });

    render(
      <MemoryRouter>
        <DashboardAdmin />
      </MemoryRouter>
    );

    expect(screen.getByText(/Painel admin/i)).toBeInTheDocument();
  });

  test("redirects to /login if not authenticated", () => {
    useAuth.mockReturnValue({ isAuthenticated: false });

    render(
      <MemoryRouter>
        <DashboardAdmin />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("renders user name if authenticated and userName is in localStorage", async () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    localStorage.setItem("userName", "Admin User");

    render(
      <MemoryRouter>
        <DashboardAdmin />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Bem-vindo\(a\), Admin User/i)
      ).toBeInTheDocument();
    });
  });

  test("renders 'Usuário não localizado' if authenticated but no userName in localStorage", async () => {
    useAuth.mockReturnValue({ isAuthenticated: true });
    localStorage.removeItem("userName");

    render(
      <MemoryRouter>
        <DashboardAdmin />
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
        <DashboardAdmin />
      </MemoryRouter>
    );

    expect(screen.getByText("UsersTable Component")).toBeInTheDocument();
  });
});
