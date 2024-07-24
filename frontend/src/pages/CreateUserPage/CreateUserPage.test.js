import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateUser from "./CreateUserPage";
import { createUser } from "../../services/api/api";

jest.mock("../../services/__mocks__/api");

test("renders CreateUserPage and submits form", async () => {
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
});
