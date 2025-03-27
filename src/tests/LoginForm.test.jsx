import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../components/LoginForm";

describe("LoginForm Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form correctly", () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("remember-checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("login-button")).toBeInTheDocument();
  });

  it("shows validation errors for empty fields on submit", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(screen.getByTestId("email-error")).toBeInTheDocument();
      expect(screen.getByTestId("password-error")).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("submits the form with valid data", async () => {
    render(<LoginForm onSubmit={mockOnSubmit} isLoading={false} />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("remember-checkbox"));

    fireEvent.click(screen.getByTestId("login-button"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
        rememberMe: true,
      });
    });
  });
});
