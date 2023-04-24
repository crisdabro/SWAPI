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
import { IPlanet } from "./types";
import { ROUTE_PARAMS } from "../constants";
import { selectPlanets, getPlanet } from "./planetsSlice";

const Planet = () => {
  const dispatch = useAppDispatch();
  const { planets } = useAppSelector(selectPlanets);

  const routeParams = useParams();

  const [planet, setPlanet] = useState<IPlanet>();

  useEffect(() => {
    setPlanet(planets.find(({ id }) => id.toString() === routeParams.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets]);

  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
  } = planet || {};
  return (
    <div>
      {planet ? (
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
                      <Text>Climate: {climate}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Gravity: {gravity}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Terrain: {terrain}</Text>
                    </ListItem>
                  </UnorderedList>
                </VStack>
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

export default Planet;
