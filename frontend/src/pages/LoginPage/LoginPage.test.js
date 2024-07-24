import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import SignIn from "./LoginPage";
import { useAuth } from "../../context/AuthContext";

jest.mock("../../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../../services/api/api", () => ({
  authenticateUser: jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SignIn", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders SignIn component", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, login: jest.fn() });

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /Sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("navigates to create user page when 'Criar Usuário' button is clicked", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, login: jest.fn() });

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Criar Usuário/i));

    expect(mockNavigate).toHaveBeenCalledWith("/create-user");
  });
});
