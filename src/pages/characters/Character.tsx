import React, { useState, useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
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
import { ICharacter } from "../../state/characters/types";
import { ROUTE_PARAMS } from "../../constants";
import {
  selectCharacters,
  getCharacters,
} from "../../state/characters/charactersSlice";
import { selectPlanets } from "../../state/planets/planetsSlice";
import { selectStarships } from "../../state/starships/starshipsSlice";

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
    id,
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
        <VStack key={id}>
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
                    <ListItem key="Height">
                      <Text>Height: {height}</Text>
                    </ListItem>
                    <ListItem key="mass">
                      <Text>Mass: {mass}</Text>
                    </ListItem>
                    <ListItem key="hair_color">
                      <Text>Hair: {hair_color}</Text>
                    </ListItem>
                    <ListItem key="skin_color">
                      <Text>Skin: {skin_color}</Text>
                    </ListItem>
                    <ListItem key="eye_color">
                      <Text>Eyes: {eye_color}</Text>
                    </ListItem>
                    <ListItem key="birth_year">
                      <Text>Birth Year: {birth_year}</Text>
                    </ListItem>
                    <ListItem key="gender">
                      <Text>Gender: {gender}</Text>
                    </ListItem>
                  </UnorderedList>
                </VStack>
                <Box>
                  <Heading size="xs" textTransform="uppercase">
                    Planet
                  </Heading>
                  <Link data-testid="planet" as={RouterLink} to={`/planets/${planetId}`}>
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
                          <ListItem key={starshipId}>
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
      )
      }
    </div >
  );
};

export default Character;
