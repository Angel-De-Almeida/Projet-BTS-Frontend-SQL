import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import de useNavigate depuis React Router

import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";

const UpdateEquipes = () => {
  const [nom_equipe, setNomEquipe] = useState("");
  const [nombre_joueurs, setNBJoueurs] = useState("");
  const [pays, setPays] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleUpdateEquipe = () => {
    axios
      .put("http://localhost:5000/equipes/update-equipe/" + id, {
        nom_equipe,
        nombre_joueurs,
        pays,
      })
      .then((res) => {
        console.log(res);
        navigate("/equipe");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box>
      <Navigation />
      <Flex
        height="100vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box width="25%">
          <Heading as="h2" size="lg" mb={10}>
            Modification d'une équipe
          </Heading>
          <VStack spacing={8} align="stretch">
            <FormControl id="nom_equipe">
              <FormLabel>Nom de l'équipe</FormLabel>
              <Input
                type="text"
                placeholder="Entrez le nom de l'équipe"
                value={nom_equipe}
                onChange={(e) => setNomEquipe(e.target.value)}
              />
            </FormControl>

            <FormControl id="pays">
              <FormLabel>Pays</FormLabel>
              <Input
                type="text"
                placeholder="Entrez le pays"
                value={pays}
                onChange={(e) => setPays(e.target.value)}
              />
            </FormControl>

            <Button colorScheme="blue" onClick={handleUpdateEquipe}>
              Créer
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default UpdateEquipes;
