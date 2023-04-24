import React, { useState, useEffect, useCallback } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  UseQueryResult,
} from "react-query";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  Text,
  Box,
  Link,
  Spinner,
  UnorderedList,
  ListItem,
  Stack,
  StackDivider,
  Heading,
  Card,
  CardHeader,
  CardBody,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ICharacter } from "./types";
import { ROUTE_PARAMS } from "../constants";
import { selectCharacters, getCharacters } from "../characters/charactersSlice";
import { selectPlanets } from "../planets/planetsSlice";
import { selectStarships } from "../starships/starshipsSlice";

const Character = () => {
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector(selectCharacters);
  const { planets } = useAppSelector(selectPlanets);
  const { starships } = useAppSelector(selectStarships);

  const routeParams = useParams();

  const [character, setCharacter] = useState<ICharacter>();

  useEffect(() => {
    characters.length > 0
      ? setCharacter(
          characters.find(({ id }) => id.toString() === routeParams.id)
        )
      : dispatch(getCharacters());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characters]);

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    planetId,
    films,
    species,
    vehicles,
    starshipsIds,
  } = character || {};

  return (
    <div>
      {character ? (
        <VStack>
          <Card>
            <CardHeader>
              <Heading size="md">{name}</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Heading size="xs" textTransform="uppercase">
                  Stats
                </Heading>
                <VStack>
                  <UnorderedList>
                    <ListItem>
                      <Text>Height: {height}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Mass: {mass}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Hair: {hair_color}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Skin: {skin_color}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Eyes: {eye_color}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Birth Year: {birth_year}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Gender: {gender}</Text>
                    </ListItem>
                  </UnorderedList>
                </VStack>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Planet
                  </Heading>{" "}
                  <Link as={RouterLink} to={`/planets/${planetId}`}>
                    {planets.find(({ id }) => id === planetId)?.name}
                  </Link>
                </Box>
                {starshipsIds && starshipsIds.length > 0 && (
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Starships
                    </Heading>
                    <UnorderedList>
                      {starshipsIds?.map((starshipId, index) => {
                        return (
                          <ListItem>
                            <Link
                              key={index}
                              as={RouterLink}
                              to={`/starships/${starshipId}`}
                            >
                              {
                                starships.find(({ id }) => id === starshipId)
                                  ?.name
                              }
                            </Link>
                          </ListItem>
                        );
                      })}
                    </UnorderedList>
                  </Box>
                )}
              </Stack>
            </CardBody>
          </Card>
        </VStack>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </div>
  );
};

export default Character;
