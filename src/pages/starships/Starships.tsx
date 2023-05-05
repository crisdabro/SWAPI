import React, { useMemo, useState } from "react";
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
  Icon,
  Input,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { IStarship } from "../../state/starships/types";
import { getIdFromUrl } from "../../utils";

import {
  selectStarships,
  getStarship,
} from "../../state/starships/starshipsSlice";
import { selectCharacters } from "../../state/characters/charactersSlice";
import { STATUS } from "../../constants";

const Starships = () => {
  const { starships, status } = useAppSelector(selectStarships);
  const [filterText, setFilterText] = useState<string>("");
  const filteredStarships = useMemo(
    () =>
      starships.filter(({ name }) =>
        name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      ),
    [starships, filterText]
  );

  return (
    <div>
      {status === STATUS.IDLE && (
        <VStack>
          <Input
            placeholder="Search"
            onChange={(event) => setFilterText(event.target.value)}
          />
          {filteredStarships?.map(({ id, name }, index: number) => {
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
