import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardUser from "./DashboardUser";
import { AuthContext } from "../../context/AuthContext";

const mockAuthContext = {
  isAuthenticated: true,
};

jest.mock("../../components/UsersTable", () => () => <div>UsersTable</div>);

test("renders DashboardUser with authenticated user", () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <MemoryRouter>
        <DashboardUser />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(screen.getByText(/Página simples de Usuário/i)).toBeInTheDocument();
  expect(screen.getByText(/Usuário não localizado/i)).toBeInTheDocument();
});
