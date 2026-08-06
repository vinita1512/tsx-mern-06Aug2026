export interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  created: string;
  species: string[];
  films: string[];
  homeworld: string;
}

export interface CharactersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}

export interface Homeworld {
  name: string;
  terrain: string;
  climate: string;
  residents: string[];
}

export interface Species {
  name: string;
}