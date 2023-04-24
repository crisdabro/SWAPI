import React, { useEffect } from "react";
import { getCharacters, selectCharacters } from "../characters/charactersSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Characters from "../characters/Characters";
import Planets from "../planets/Planets";
import Starships from "../starships/Starships";
import { getIdFromUrl } from "../utils";
import { getPlanet } from "../planets/planetsSlice";
import { getStarship } from "../starships/starshipsSlice";
import { STATUS } from "../constants";

import {
  Heading,
  VStack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { ErrorCallback } from "typescript";

const HomeTabsPanel = () => {
  const dispatch = useAppDispatch();
  const { characters, status } = useAppSelector(selectCharacters);
  const toast = useToast();

  useEffect(() => {
    dispatch(getCharacters())
      .unwrap()
      .then((charactersResult) => {
        let planetsIds = new Set<number>();
        charactersResult.results.forEach(({ homeworld }) =>
          planetsIds.add(getIdFromUrl(homeworld))
        );
        planetsIds.forEach((id) => dispatch(getPlanet(id)));

        let starshipsIds = new Set<number>();
        charactersResult.results.forEach((character: any) =>
          character.starships.forEach((starship: string) =>
            starshipsIds.add(getIdFromUrl(starship))
          )
        );
        starshipsIds.forEach((id) => dispatch(getStarship(id)));
      })
      .catch((error: ErrorEvent) => {
        toast({
          title: "Error fetching the characters.",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack gap={10}>
      <Heading size="4xl">SWAPI-CLIENT</Heading>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Characters</Tab>
          <Tab>Favourite Characters</Tab>
          <Tab>Planets</Tab>
          <Tab>Starships</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Characters />
          </TabPanel>
          <TabPanel>
            <Characters showFavourites />
          </TabPanel>
          <TabPanel>
            <Planets />
          </TabPanel>
          <TabPanel>
            <Starships />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {status === STATUS.LOADING && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </VStack>
  );
};

export default HomeTabsPanel;
