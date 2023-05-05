import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  UseQueryResult,
} from "react-query";
import { useAppSelector, useAppDispatch } from "../../state/hooks";
import {
  Link,
  Spinner,
  Icon,
  HStack,
  VStack,
  Input,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { ICharacter } from "../../state/characters/types";

import {
  selectCharacters,
  toggleFavourite,
} from "../../state/characters/charactersSlice";
import { STATUS } from "../../constants";

const Characters = ({ showFavourites = false }) => {
  const dispatch = useAppDispatch();
  const { characters, status } = useAppSelector(selectCharacters);
  const [filterText, setFilterText] = useState("");

  const filteredCharacters = useMemo(() => {
    let result: ICharacter[] = showFavourites
      ? characters.filter(({ isFavourite }) => isFavourite)
      : characters;
    result = result.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
    );
    return result;
  }, [characters, showFavourites, filterText]);

  return (
    <>
      {status === STATUS.IDLE && (
        <VStack>
          <Input
            placeholder="Search"
            onChange={(event) => setFilterText(event.target.value)}
          />
          {filteredCharacters?.map(
            ({ id, name, url, isFavourite }, index: number) => {
              return (
                <HStack data-testid={showFavourites ? "favouriteCharacter" : "character"} key={id} fontSize="2xl">
                  <Link as={RouterLink} to={`/characters/${id}`}>
                    {name}
                  </Link>
                  <Icon
                    data-testid={"favourite-icon"}
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
