import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardAdmin from "./DashboardAdmin";
import AuthContext from "../../context/AuthContext";

const mockAuthContext = {
  isAuthenticated: true,
  user: { name: "Test User" },
};

jest.mock("../../components/UsersTable", () => () => <div>UsersTable</div>);

test("renders DashboardAdmin with authenticated user", () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <MemoryRouter>
        <DashboardAdmin />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  expect(screen.getByText(/Painel admin/i)).toBeInTheDocument();
  expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  expect(screen.getByText(/UsersTable/i)).toBeInTheDocument(); // Verifica se o componente mockado é renderizado
});
