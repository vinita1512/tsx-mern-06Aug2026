import { useEffect, useState } from "react";
import type { Character } from "../types/character";
import { getCharacters } from "../services/characterService";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCharacters(page);

        setCharacters(data.results);

        setHasNext(data.next !== null);
        setHasPrevious(data.previous !== null);
      } catch (err) {
        setError("Failed to fetch characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  return {
    characters,
    loading,
    error,

    page,
    setPage,

    hasNext,
    hasPrevious,
  };
};

export default useCharacters;