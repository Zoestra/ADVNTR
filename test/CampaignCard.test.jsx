import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CampaignCard from "../Components/CampaignCard.jsx";

vi.mock("../Data/DM_data", () => ({
  DM_data: [
    { id: 1, name: "Merlin", contact: "merlin@magic.com" },
    { id: 2, name: "Elminster", contact: "elminster@faerun.com" }
  ]
}));

const exampleCampaign = {
  name: "Lost Mines",
  location: "Neverwinter",
  dm: 1,
  style: "Classic Fantasy"
};

describe("CampaignCard Component", () => {
  it("renders campaign name", () => {
    render(<CampaignCard campaign={exampleCampaign} />);
    expect(screen.getByText("Lost Mines")).toBeInTheDocument();
  });

  it("renders location", () => {
    render(<CampaignCard campaign={exampleCampaign} />);
    expect(screen.getByText("Neverwinter")).toBeInTheDocument();
  });

  it("renders DM name", () => {
    render(<CampaignCard campaign={exampleCampaign} />);
    expect(screen.getByText("Merlin")).toBeInTheDocument();
  });

  it("renders DM contact", () => {
    render(<CampaignCard campaign={exampleCampaign} />);
    expect(screen.getByText("merlin@magic.com")).toBeInTheDocument();
  });

  it("renders theme/setting", () => {
    render(<CampaignCard campaign={exampleCampaign} />);
    expect(screen.getByText("Classic Fantasy")).toBeInTheDocument();
  });
});
