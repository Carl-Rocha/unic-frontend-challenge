import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditUser from "./EditUser";
import { AuthContext } from "../../context/AuthContext";
import { getUsers } from "../../services/api/api";

const mockAuthContext = {
  token: "dummy-token",
};

test("renders EditUser and performs search", async () => {
  render(
    <AuthContext.Provider value={mockAuthContext}>
      <MemoryRouter>
        <EditUser />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  fireEvent.change(screen.getByLabelText(/Insira email ou nome/i), {
    target: { value: "testuser" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Procurar/i }));

  await waitFor(() => {
    expect(getUsers).toHaveBeenCalledWith("testuser", "dummy-token");
  });
});
