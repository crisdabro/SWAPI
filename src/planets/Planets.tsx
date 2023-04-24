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
  Icon,
  IconButton,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { IPlanet } from "./types";
import { getIdFromUrl } from "../utils";

import { selectPlanets, getPlanet } from "./planetsSlice";
import { selectCharacters } from "../characters/charactersSlice";
import { STATUS } from "../constants";

const Planets = () => {
  const dispatch = useAppDispatch();
  const { planets, status } = useAppSelector(selectPlanets);
  const { characters } = useAppSelector(selectCharacters);

  return (
    <>
      {status === STATUS.IDLE && (
        <VStack>
          {planets?.map(({ id, name }, index: number) => {
            return (
              <HStack key={index} fontSize="2xl">
                <Link as={RouterLink} to={`/planets/${id}`}>
                  {name}
                </Link>
              </HStack>
            );
          })}
        </VStack>
      )}
      {status === STATUS.LOADING && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </>
  );
};

export default Planets;
