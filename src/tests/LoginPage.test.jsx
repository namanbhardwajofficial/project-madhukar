import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "../components/LoginPage";

// Mock the useAuth hook
jest.mock("../hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({
    login: jest.fn().mockImplementation((email, password) => {
      if (email === "test@example.com" && password === "password123") {
        return Promise.resolve({ success: true });
      } else {
        return Promise.resolve({
          success: false,
          message: "Invalid email or password",
        });
      }
    }),
  }),
}));

describe("LoginPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login page correctly", () => {
    render(<LoginPage />);

    expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });

  it("displays an error message on unsuccessful login", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "wrong@example.com" },
    });

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(screen.getByTestId("login-error")).toBeInTheDocument();
    });
  });
});
