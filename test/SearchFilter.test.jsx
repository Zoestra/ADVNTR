import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchFilter from "../Components/SearchFilter.jsx";
import { fetcher } from "../API/fetcher.jsx";

vi.mock("../API/fetcher.jsx", () => ({
  fetcher: {
    campaign: vi.fn(),
    dm: vi.fn(),
    player: vi.fn()
  }
}));

vi.mock("../Components/CampaignCard.jsx", () => ({
  default: ({ campaign }) => <div>{campaign.name}</div>
}));

vi.mock("../Components/DMCard.jsx", () => ({
  default: ({ dm }) => <div>{dm.username}</div>
}));

vi.mock("../Components/PlayerCard.jsx", () => ({
  default: ({ player }) => <div>{player.username}</div>
}));

describe("SearchFilter Component", () => {
  beforeEach(() => {
    fetcher.campaign.mockResolvedValue({
      campaigns: [
        { id: 1, name: "Lost Mines", location: "Neverwinter", schedule: "Friday nights", style: "Fantasy" },
        { id: 2, name: "Dragon Heist", location: "Waterdeep", schedule: "Weeknights (Mon–Thu)", style: "Urban" }
      ]
    });

    fetcher.dm.mockResolvedValue({
      users: [
        { id: 1, username: "Gandalf", location: "Middle Earth", schedule: "All" },
        { id: 2, username: "Elminster", location: "Faerun", schedule: "Sunday evenings" }
      ]
    });

    fetcher.player.mockResolvedValue({
      users: [
        { id: 1, username: "Bilbo", location: "Shire", schedule: "Saturday mornings" },
        { id: 2, username: "Frodo", location: "Shire", schedule: "All" }
      ]
    });
  });

  it("loads and displays campaigns, DMs, and players", async () => {
    render(<SearchFilter />);

    await waitFor(() => {
      expect(screen.getByText("Lost Mines")).toBeInTheDocument();
      expect(screen.getByText("Dragon Heist")).toBeInTheDocument();
      expect(screen.getByText("Gandalf")).toBeInTheDocument();
      expect(screen.getByText("Bilbo")).toBeInTheDocument();
    });
  });

  it("filters by location", async () => {
    render(<SearchFilter />);

    await waitFor(() => screen.getByText("Lost Mines"));

    fireEvent.change(screen.getByPlaceholderText("search by location"), {
      target: { value: "Never" }
    });

    expect(screen.getByText("Lost Mines")).toBeInTheDocument();
    expect(screen.queryByText("Dragon Heist")).toBeNull();
  });

  it("filters campaigns by style", async () => {
    render(<SearchFilter />);

    await waitFor(() => screen.getByText("Lost Mines"));

    fireEvent.change(screen.getByPlaceholderText("search by style"), {
      target: { value: "Urban" }
    });

    expect(screen.getByText("Dragon Heist")).toBeInTheDocument();
    expect(screen.queryByText("Lost Mines")).toBeNull();
  });

  it("filters DMs by name", async () => {
    render(<SearchFilter />);

    await waitFor(() => screen.getByText("Gandalf"));

    fireEvent.change(screen.getByPlaceholderText("search by user name"), {
      target: { value: "Gand" }
    });

    expect(screen.getByText("Gandalf")).toBeInTheDocument();
    expect(screen.queryByText("Elminster")).toBeNull();
  });

  it("filters players by name", async () => {
    render(<SearchFilter />);

    await waitFor(() => screen.getByText("Bilbo"));

    const inputs = screen.getAllByPlaceholderText("search by user name");
    const playerInput = inputs[inputs.length - 1];

    fireEvent.change(playerInput, { target: { value: "Fro" } });

    expect(screen.getByText("Frodo")).toBeInTheDocument();
    expect(screen.queryByText("Bilbo")).toBeNull();
  });
});
