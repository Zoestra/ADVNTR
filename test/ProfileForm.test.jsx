import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileForm from "../Components/ProfileForm.jsx";
import { auth } from "../API/auth.jsx";

vi.mock("../API/auth.jsx", () => ({
  auth: {
    register: vi.fn()
  }
}));

describe("ProfileForm Component", () => {
  let onSubmitMock;

  beforeEach(() => {
    onSubmitMock = vi.fn();
  });

  it("renders form fields", () => {
    render(<ProfileForm onSubmit={onSubmitMock} />);
    expect(screen.getByText("Create Your Profile")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Choose a username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("At least 6 characters")).toBeInTheDocument();
    expect(screen.getByText("Player")).toBeInTheDocument();
    expect(screen.getByText("Dungeon Master (DM)")).toBeInTheDocument();
  });

  it("allows switching roles", () => {
    render(<ProfileForm onSubmit={onSubmitMock} />);
    fireEvent.click(screen.getByLabelText("Dungeon Master (DM)"));
    expect(screen.getByLabelText("Dungeon Master (DM)")).toBeChecked();
  });

  it("submits successfully", async () => {
    auth.register.mockResolvedValue({
      success: true,
      message: "Account created successfully",
      username: "TestUser",
      role: "Player"
    });

    render(<ProfileForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "TestUser" }
    });

    fireEvent.change(screen.getByPlaceholderText("At least 6 characters"), {
      target: { value: "123456" }
    });

    fireEvent.click(screen.getByText("Create Account"));

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });

    expect(screen.getByText(/Account created successfully/i)).toBeInTheDocument();
  });

  it("handles registration error", async () => {
    auth.register.mockRejectedValue(new Error("Server down"));

    render(<ProfileForm onSubmit={onSubmitMock} />);

    fireEvent.change(screen.getByPlaceholderText("Choose a username"), {
      target: { value: "ErrorUser" }
    });

    fireEvent.change(screen.getByPlaceholderText("At least 6 characters"), {
      target: { value: "123456" }
    });

    fireEvent.click(screen.getByText("Create Account"));

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument();
    });
  });
});
