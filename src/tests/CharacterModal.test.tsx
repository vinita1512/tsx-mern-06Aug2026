import { render, screen, waitFor } from "@testing-library/react";
import CharacterModal from "../components/CharacterModal";
import { vi } from "vitest";

vi.mock("../services/characterService", () => ({
  getHomeworld: vi.fn().mockResolvedValue({
    name: "Tatooine",
    terrain: "desert",
    climate: "arid",
    residents: ["1", "2"],
  }),
}));

const character = {
  name: "Luke Skywalker",
  height: "172",
  mass: "77",
  birth_year: "19BBY",
  created: "2014-12-09T13:50:51.644000Z",
  species: [],
  films: ["1", "2", "3", "4", "5"],
  homeworld: "https://swapi.py4e.com/api/planets/1/",
};

describe("CharacterModal", () => {
  it("renders character and homeworld information", async () => {
    render(
      <CharacterModal
        character={character}
        onClose={() => {}}
      />
    );

    expect(
      screen.getByText("Luke Skywalker")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Height:/)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Birth Year:/)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText("Tatooine")
      ).toBeInTheDocument();
    });
  });
});