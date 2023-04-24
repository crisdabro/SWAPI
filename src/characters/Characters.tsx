import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { ICharacter } from "./types";
import { getIdFromUrl } from "../utils";

import { selectCharacters, toggleFavourite } from "./charactersSlice";
import { STATUS } from "../constants";

const Characters = ({ showFavourites = false }) => {
  const dispatch = useAppDispatch();
  const { characters, status } = useAppSelector(selectCharacters);

  const filteredCharacters = useMemo(
    () =>
      showFavourites
        ? characters.filter(({ isFavourite }) => isFavourite)
        : characters,
    [characters, showFavourites]
  );

  return (
    <>
      {status === STATUS.IDLE && (
        <VStack>
          {filteredCharacters?.map(
            ({ id, name, url, isFavourite }, index: number) => {
              return (
                <HStack key={index} fontSize="2xl">
                  <Link as={RouterLink} to={`/characters/${id}`}>
                    {name}
                  </Link>
                  <Icon
                    _hover={{ cursor: "pointer" }}
                    onClick={() => dispatch(toggleFavourite(id))}
                    as={StarIcon}
                    color={isFavourite ? "yellow.400" : "black"}
                  />
                </HStack>
              );
            }
          )}
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

export default Characters;
