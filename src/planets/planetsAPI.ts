import { IPlanet } from "./types";

export const fetchPlanet = async (id: number): Promise<IPlanet> => {
  const res = await fetch(`https://swapi.dev/api/planets/${id}/`);
  if (res.ok) {
    return res.json();
  } else throw new Error("Network response was not ok");
};
