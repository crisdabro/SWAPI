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
import { IStarship } from "./types";
import { getIdFromUrl } from "../utils";

import { selectStarships, getStarship } from "./starshipsSlice";
import { selectCharacters } from "../characters/charactersSlice";
import { STATUS } from "../constants";

const Starships = () => {
  const dispatch = useAppDispatch();
  const { starships, status } = useAppSelector(selectStarships);
  const { characters } = useAppSelector(selectCharacters);

  return (
    <div>
      {status === STATUS.IDLE && (
        <VStack>
          {starships?.map(({ id, name }, index: number) => {
            return (
              <HStack key={index} fontSize="2xl">
                <Link as={RouterLink} to={`/starships/${id}`}>
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
    </div>
  );
};

export default Starships;
