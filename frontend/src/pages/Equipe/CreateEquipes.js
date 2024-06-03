import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const CreateEquipes = () => {
  const [nom_equipe, setNomEquipe] = useState("");
  const [pays, setPays] = useState("");
  const [logo, setLogo] = useState(null); // State to store the selected logo image file
  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setLogo(file);
    } else {
      console.error("Veuillez sélectionner un fichier image valide.");
    }
  };

  const handleCreateEquipe = async () => {
    try {
      const formData = new FormData();
      formData.append("nom_equipe", nom_equipe);
      formData.append("pays", pays);
      if (logo) {
        formData.append("logo", logo);
      }

      await axios.post("http://localhost:5000/equipes/create-equipe", formData);
      navigate("/equipe");
    } catch (err) {
      if (err.response) {
        console.error(
          "Erreur lors de la création de l'équipe :",
          err.response.data
        );
      } else if (err.request) {
        console.error(
          "La requête de création de l'équipe n'a pas reçu de réponse."
        );
      } else {
        console.error(
          "Erreur lors de la configuration de la requête de création de l'équipe :",
          err.message
        );
      }
    }
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
            Création d'une équipe
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

            <FormControl id="logo" marginBottom="1rem">
              <FormLabel fontWeight="bold" fontSize="lg">
                Logo
              </FormLabel>
              <Input type="file" onChange={handleLogoChange} />
            </FormControl>

            <Button colorScheme="blue" onClick={handleCreateEquipe}>
              Créer
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateEquipes;
