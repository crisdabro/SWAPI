import React from "react";
import Character from "../characters/Character";
import Starship from "../starships/Starship";
import Planet from "../planets/Planet";
import { Routes, Route } from "react-router-dom";
import HomeTabsPanel from "./homeTabsPanel";

const Home = () => {
  return (
    <Routes>
      <Route path={`/characters/:id`} element={<Character />} />
      <Route path="/planets/:id" element={<Planet />} />
      <Route path="/starships/:id" element={<Starship />} />
      <Route path="/" element={<HomeTabsPanel />} />
    </Routes>
  );
};

export default Home;
