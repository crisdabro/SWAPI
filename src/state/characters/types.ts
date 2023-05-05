export interface ICharacters {
  name: string;
  next: string;
  results: [];
}

export interface ICharacter {
  id: number;
  isFavourite: boolean;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  planetId: number;
  starships: string[];
  starshipsIds: number[];
  created: string;
  edited: string;
  url: string;
}
