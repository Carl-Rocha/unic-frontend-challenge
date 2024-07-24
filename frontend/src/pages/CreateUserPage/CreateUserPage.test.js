import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateUser from "./CreateUserPage";
import { createUser } from "../../services/api/api";
import "@testing-library/jest-dom";

jest.mock("../../services/api/api");

test("renders CreateUser and submits form", async () => {
  createUser.mockResolvedValueOnce({});

  render(
    <MemoryRouter>
      <CreateUser />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByLabelText(/Nome/i), {
    target: { value: "Test User" },
  });

  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "test@example.com" },
  });

  fireEvent.change(screen.getByLabelText(/Senha/i), {
    target: { value: "password" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Criar Usuário/i }));

  await waitFor(() => {
    expect(createUser).toHaveBeenCalledWith({
      name: "Test User",
      email: "test@example.com",
      password: "password",
    });
  });

  await waitFor(() => {
    expect(screen.getByText("Usuário criado com sucesso")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole("button", { name: /Ok/i }));

  await waitFor(() => {
    expect(
      screen.queryByText("Usuário criado com sucesso")
    ).not.toBeInTheDocument();
  });
});
