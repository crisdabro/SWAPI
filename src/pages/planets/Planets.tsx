import React, { useState, useMemo } from "react";
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
import { IPlanet } from "../../state/planets/types";
import { getIdFromUrl } from "../../utils";

import { selectPlanets } from "../../state/planets/planetsSlice";
import { STATUS } from "../../constants";

const Planets = () => {
  const { planets, status } = useAppSelector(selectPlanets);
  const [filterText, setFilterText] = useState<string>("");

  const filteredPlanets = useMemo(() => {
    let result: IPlanet[] = planets;
    result = result.filter(({ name }) =>
      name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
    );
    return result;
  }, [planets, filterText]);

  return (
    <>
      {status === STATUS.IDLE && (
        <VStack>
          <Input
            placeholder="Search"
            onChange={(event) => setFilterText(event.target.value)}
          />
          {filteredPlanets?.map(({ id, name }, index: number) => {
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
