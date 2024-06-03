import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import de useNavigate depuis React Router

import {
  Box,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";

const roles = ["Initiateur", "Sentinelle", "Contrôleur", "Duelliste"];

const UpdateJoueurs = () => {
  const [pseudo, setPseudo] = useState("");
  const [role, setRole] = useState("");
  const [id_equipe, setIDEquipe] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipes, setEquipes] = useState([]); // État pour stocker la liste des équipes

  // Récupérer la liste des équipes depuis le backend lors du chargement du composant
  useEffect(() => {
    axios
      .get("http://localhost:5000/equipes")
      .then((res) => {
        setEquipes(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateJoueur = () => {
    axios
      .put("http://localhost:5000/joueurs/update-joueur/" + id, {
        pseudo,
        role,
        id_equipe,
      })
      .then((res) => {
        console.log(res);
        navigate("/joueur");
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
            Modification d'un joueur
          </Heading>
          <VStack spacing={8} align="stretch">
            <FormControl id="pseudo">
              <FormLabel>Pseudo</FormLabel>
              <Input
                type="text"
                placeholder="Entrez le pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
              />
            </FormControl>

            <FormControl id="role">
              <FormLabel>Rôle</FormLabel>
              <Select
                placeholder="Sélectionnez un rôle"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl id="team">
              <FormLabel>Equipe</FormLabel>
              <Select
                placeholder="Sélectionnez une équipe"
                value={id_equipe}
                onChange={(e) => setIDEquipe(e.target.value)}
              >
                {equipes.map((equipe) => (
                  <option key={equipe.id_equipe} value={equipe.id_equipe}>
                    {equipe.nom_equipe}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Button colorScheme="blue" onClick={handleUpdateJoueur}>
              Modifier
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default UpdateJoueurs;
