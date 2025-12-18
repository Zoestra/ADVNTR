import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AccountLogin from "../Components/AccountLogin.jsx";
import { auth } from "../API/auth.jsx";

vi.mock("../API/auth.jsx", () => ({
  auth: {
    login: vi.fn()
  }
}));

vi.mock("../Components/ProfileForm.jsx", () => ({
  default: ({ onSubmit }) => (
    <button onClick={() => onSubmit({ success: true, username: "NewUser", role: "Player" })}>
      Mock ProfileForm Submit
    </button>
  )
}));

describe("AccountLogin (Medium Coverage)", () => {
  let setUserMock;

  beforeEach(() => {
    setUserMock = vi.fn();
  });

  it("renders login and create account buttons", () => {
    render(<AccountLogin user={null} setUser={setUserMock} />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });

  it("toggles login form", () => {
    render(<AccountLogin user={null} setUser={setUserMock} />);
    fireEvent.click(screen.getByText("Login"));
    expect(screen.getByText("Log In")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close Login"));
    expect(screen.queryByText("Log In")).toBeNull();
  });

  it("logs in successfully", async () => {
    auth.login.mockResolvedValue({
      user: { username: "Bruno", role: "Player" }
    });

    render(<AccountLogin user={null} setUser={setUserMock} />);

    fireEvent.click(screen.getByText("Login"));
    fireEvent.change(screen.getByLabelText("Username:"), { target: { value: "Bruno" } });
    fireEvent.change(screen.getByLabelText("Password:"), { target: { value: "1234" } });
    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() => {
      expect(setUserMock).toHaveBeenCalledWith({ username: "Bruno", role: "Player" });
    });

    expect(screen.getByText(/Login successful/i)).toBeInTheDocument();
  });

  it("renders logged-in UI and logs out", () => {
    const user = { username: "Alice", role: "DM" };

    render(<AccountLogin user={user} setUser={setUserMock} />);

    expect(screen.getByText("Welcome, Alice!")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Log Out"));
    expect(setUserMock).toHaveBeenCalledWith(null);
  });

  it("toggles account creation form and handles success", async () => {
    render(<AccountLogin user={null} setUser={setUserMock} />);

    fireEvent.click(screen.getByText("Create Account"));
    fireEvent.click(screen.getByText("Mock ProfileForm Submit"));

    await waitFor(() => {
      expect(screen.getByText(/Account created successfully/i)).toBeInTheDocument();
    });
  });
});
