import { IStarship } from "./types";

export const fetchStarship = async (id: number): Promise<IStarship> => {
  const res = await fetch(`https://swapi.dev/api/starships/${id}/`);
  if (res.ok) {
    return res.json();
  } else throw new Error("Network response was not ok");
};
