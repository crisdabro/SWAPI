import { ICharacters } from "../state/characters/types";

export const fetchCharacters = async (): Promise<ICharacters> => {
  const res = await fetch(`https://swapi.dev/api/people/`);
  if (res.ok) {
    return res.json();
  } else throw new Error("Network response was not ok");
};
