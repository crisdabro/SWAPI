import { LRUCache } from "lru-cache";
import { fetchCharacters as fetchCharactersApi } from "./charactersAPI";
import { fetchPlanet as fetchPlanetApi } from "./planetsAPI";
import { ICharacters } from "../state/characters/types";
import { IPlanet } from "../state/planets/types";

const cache = new LRUCache({ ttl: 1000 * 60 * 5, max: 500 });

export const fetchCharacters = async () => {
  if (cache.has("characters")) {
    return cache.get("characters") as ICharacters;
  }
  const result = (await fetchCharactersApi()) as ICharacters;
  cache.set("characters", result);
  return result;
};

export const fetchPlanet = async (id: number) => {
  if (cache.has(`planets/${id}`)) {
    return cache.get(`planets/${id}`) as IPlanet;
  }
  const result = (await fetchPlanetApi(id)) as IPlanet;
  cache.set(`planets/${id}`, result);
  return result;
};
