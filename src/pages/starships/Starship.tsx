import React, { useState, useEffect, useCallback } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  UseQueryResult,
} from "react-query";
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
import { IStarship } from "../../state/starships/types";
import { ROUTE_PARAMS } from "../../constants";
import {
  selectStarships,
  getStarship,
} from "../../state/starships/starshipsSlice";

const Starship = () => {
  const dispatch = useAppDispatch();
  const { starships } = useAppSelector(selectStarships);

  const routeParams = useParams();

  const [starship, setStarship] = useState<IStarship>();

  useEffect(() => {
    setStarship(starships.find(({ id }) => id.toString() === routeParams.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starships]);

  const {
    name,
    model,
    manufacturer,
    cost_in_credits,
    length,
    max_atmosphering_speed,
    crew,
    passengers,
    cargo_capacity,
    consumables,
    hyperdrive_rating,
    MGLT,
    starship_class,
    pilots,
    films,
  } = starship || {};

  return (
    <div>
      {starship ? (
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
                      <Text>model: {model}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>manufacturer: {manufacturer}</Text>
                    </ListItem>
                    <ListItem>
                      <Text>Price: {cost_in_credits}</Text>
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

export default Starship;
