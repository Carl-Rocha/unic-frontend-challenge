import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrocarSenha from "./TrocarSenha";
import { AuthContext } from "../../context/AuthContext";
import { updateUserPassword } from "../../services/api/api";

jest.mock("../../services/__mocks__/api");

const mockAuthContext = {
  isAuthenticated: true,
  user: {
    id: "123",
    name: "Test User",
    email: "test@example.com",
    role: "user",
  },
};

test("renders TrocarSenha and changes password", async () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <MemoryRouter>
        <TrocarSenha />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  fireEvent.change(screen.getByLabelText(/Senha Atual/i), {
    target: { value: "oldpassword" },
  });
  fireEvent.change(screen.getByLabelText(/Nova Senha/i), {
    target: { value: "newpassword" },
  });
  fireEvent.change(screen.getByLabelText(/Confirmar Nova Senha/i), {
    target: { value: "newpassword" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Trocar Senha/i }));

  await waitFor(() => {
    expect(updateUserPassword).toHaveBeenCalledWith(
      "123",
      "oldpassword",
      "newpassword",
      expect.any(String)
    );
  });
});
