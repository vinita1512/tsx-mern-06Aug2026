import { useState } from "react";
import CharacterCard from "../components/CharacterCard";
import CharacterModal from "../components/CharacterModal";
import useCharacters from "../hooks/useCharacters";
import type { Character } from "../types/character";

const Home = () => {
  const {
    characters,
    loading,
    error,
    page,
    setPage,
    hasNext,
    hasPrevious,
  } = useCharacters();

  const [selectedCharacter, setSelectedCharacter] =
    useState<Character | null>(null);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"></div>
          <p className="text-lg font-semibold text-slate-700">
            Loading Star Wars Characters...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
        <div className="rounded-xl bg-white p-8 text-center shadow-lg">
          <h2 className="mb-2 text-2xl font-bold text-red-600">
            Something went wrong!
          </h2>

          <p className="text-slate-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}

        <h1 className="text-center text-4xl font-bold text-slate-800 md:text-5xl">
          ⭐ Star Wars Characters ⭐
        </h1>

        <p className="mt-2 mb-10 text-center text-slate-500">
          Explore your favorite Star Wars characters from the galaxy.
        </p>

        {/* Character Cards */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((character) => (
            <CharacterCard
              key={character.name}
              character={character}
              onClick={() => setSelectedCharacter(character)}
            />
          ))}
        </div>

        {/* Pagination */}

        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!hasPrevious}
            className="rounded-lg bg-slate-800 px-5 py-2 text-white transition-all duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ← Previous
          </button>

          <div className="rounded-lg bg-white px-5 py-2 shadow">
            <span className="font-semibold text-slate-700">
              Page {page}
            </span>
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={!hasNext}
            className="rounded-lg bg-slate-800 px-5 py-2 text-white transition-all duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next →
          </button>
        </div>

        {/* Character Modal */}

        {selectedCharacter && (
          <CharacterModal
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
          />
        )}
      </div>
    </main>
  );
};

export default Home;