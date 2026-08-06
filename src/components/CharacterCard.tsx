import { useEffect, useState } from "react";
import type { Character } from "../types/character";
import { getSpecies } from "../services/characterService";
import { getSpeciesColor } from "../utils/helpers";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

const CharacterCard = ({ character, onClick }: CharacterCardProps) => {
  const [species, setSpecies] = useState("Human");

  useEffect(() => {
    const fetchSpecies = async () => {
      if (character.species.length === 0) {
        setSpecies("Human");
        return;
      }

      try {
        const data = await getSpecies(character.species[0]);
        setSpecies(data.name);
      } catch {
        setSpecies("Unknown");
      }
    };

    fetchSpecies();
  }, [character]);

  return (
    <div
      onClick={onClick}
      className={`
        ${getSpeciesColor(species)}
        cursor-pointer
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      `}
    >
      <img
        src={`https://picsum.photos/seed/${character.name}/400/300`}
        alt={character.name}
        className="h-56 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-center text-xl font-bold text-slate-800">
          {character.name}
        </h2>
      </div>
    </div>
  );
};

export default CharacterCard;