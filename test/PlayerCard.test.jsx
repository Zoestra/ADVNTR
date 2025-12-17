import { describe, it, expect } from "vitest";
import { render, screen} from "@testing-library/react";
import PlayerCard from "../Components/PlayerCard.jsx";


const examplePlayer = {
    username: "Bruno Diaz",
    location: "Gottham",
    pronouns: "he/him",
    schedule: "Friday evenings",
    contact: "bruno.diaz@example.com"
};

describe('Renders player card correctly', () => {
    it("renders username", () => {
        render(<PlayerCard player={examplePlayer} />);
        expect(screen.getAllByText("Bruno Diaz")).not.toBeNull();
    });

    it("renders location",  () => {
        render(<PlayerCard player={examplePlayer} />);
        expect(screen.getAllByText("Gottham")).not.toBeNull();
    });

    it("renders pronouns",  () => {
        render(<PlayerCard player={examplePlayer} />);
        expect(screen.getAllByText("he/him")).not.toBeNull();
    });

    it("renders schedule",  () => {
        render(<PlayerCard player={examplePlayer} />);
        expect(screen.getAllByText("Friday evenings")).not.toBeNull();
    });

    it("renders contact info",  () => {
        render(<PlayerCard player={examplePlayer} />);
        expect(screen.getAllByText("bruno.diaz@example.com")).not.toBeNull();
    });
});