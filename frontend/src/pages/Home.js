import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import CardsEquipes from "../components/CardsEquipes";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <Box>
      <Navigation />
      <Flex
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width="80%" alignItems="center" justifyContent="center">
          <CardsEquipes />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
