import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "../home/routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider>
          <Home />
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
