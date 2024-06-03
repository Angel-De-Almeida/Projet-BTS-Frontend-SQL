import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import Navigation from "../components/Navigation";
import CardsJoueurs from "../components/CardsJoueurs";

const ListeJoueurs = () => {
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
          <CardsJoueurs />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ListeJoueurs;
