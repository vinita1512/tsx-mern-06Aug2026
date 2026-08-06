import swapi from "../api/swapi";
import type { CharactersResponse } from "../types/character";
import type { Homeworld } from "../types/character";

export const getCharacters = async (page: number) => {
  const response = await swapi.get<CharactersResponse>(
    `/people?page=${page}`
  );

  return response.data;
};

export const getHomeworld = async (url: string) => {
  const response = await swapi.get<Homeworld>(
    url.replace(import.meta.env.VITE_API_BASE_URL, "")
  );

  return response.data;
};

import type { Species } from "../types/character";

export const getSpecies = async (url: string) => {
  const response = await swapi.get<Species>(
    url.replace(import.meta.env.VITE_API_BASE_URL, "")
  );

  return response.data;
};