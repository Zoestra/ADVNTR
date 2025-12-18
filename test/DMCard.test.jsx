import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DMCard from "../Components/DMCard.jsx";

const exampleDM = {
  username: "Gandalf",
  location: "Middle Earth",
  pronouns: "he/him",
  schedule: "Mondays",
  cotact: "gandalf@wizardmail.com"
};

describe("DMCard Component", () => {
  it("renders name", () => {
    render(<DMCard dm={exampleDM} />);
    expect(screen.getByText("Gandalf")).toBeInTheDocument();
  });

  it("renders location", () => {
    render(<DMCard dm={exampleDM} />);
    expect(screen.getByText("Middle Earth")).toBeInTheDocument();
  });

  it("renders pronouns", () => {
    render(<DMCard dm={exampleDM} />);
    expect(screen.getByText("he/him")).toBeInTheDocument();
  });

  it("renders schedule", () => {
    render(<DMCard dm={exampleDM} />);
    expect(screen.getByText("Mondays")).toBeInTheDocument();
  });

  it("renders contact info", () => {
    render(<DMCard dm={exampleDM} />);
    expect(screen.getByText("gandalf@wizardmail.com")).toBeInTheDocument();
  });
});
