import { useEffect, useState } from "react";
import type { Character, Homeworld } from "../types/character";
import { getHomeworld } from "../services/characterService";
import { IoClose } from "react-icons/io5";

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

const formatHeight = (height: string) => {
  if (height === "unknown") return "Unknown";
  return `${(Number(height) / 100).toFixed(2)} m`;
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");
};

const CharacterModal = ({
  character,
  onClose,
}: CharacterModalProps) => {
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        setLoading(true);

        const data = await getHomeworld(character.homeworld);

        setHomeworld(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeworld();
  }, [character]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold text-slate-800">
            {character.name}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl font-bold text-slate-500 hover:text-red-500"
          >
            <IoClose size={32} />
          </button>
        </div>

        {/* Character Details */}
        <div className="space-y-3">
          <p>
            <span className="font-semibold">Height:</span>{" "}
            {formatHeight(character.height)}
          </p>

          <p>
            <span className="font-semibold">Mass:</span>{" "}
            {character.mass} kg
          </p>

          <p>
            <span className="font-semibold">Birth Year:</span>{" "}
            {character.birth_year}
          </p>

          <p>
            <span className="font-semibold">Films:</span>{" "}
            {character.films.length}
          </p>

          <p>
            <span className="font-semibold">Created:</span>{" "}
            {formatDate(character.created)}
          </p>
        </div>

        {/* Homeworld */}
        <div className="mt-8 border-t pt-6">
          <h3 className="mb-4 text-xl font-bold">
            🌍 Homeworld
          </h3>

          {loading ? (
            <p>Loading homeworld...</p>
          ) : homeworld ? (
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {homeworld.name}
              </p>

              <p>
                <span className="font-semibold">Terrain:</span>{" "}
                {homeworld.terrain}
              </p>

              <p>
                <span className="font-semibold">Climate:</span>{" "}
                {homeworld.climate}
              </p>

              <p>
                <span className="font-semibold">
                  Residents:
                </span>{" "}
                {homeworld.residents.length}
              </p>
            </div>
          ) : (
            <p>Homeworld not available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;