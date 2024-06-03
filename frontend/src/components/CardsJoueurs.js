import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const CardsJoueurs = () => {
  const [joueurs, setJoueurs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Convertir l'ID extrait de l'URL en nombre entier
    const idEquipe = parseInt(id);

    axios
      .get(`http://localhost:5000/joueurs`)
      .then((res) => {
        console.log("Type de l'id extrait de l'URL:", typeof id); // Affichage du type de l'ID extrait de l'URL
        console.log("Données des joueurs:", res.data);

        // Filtrer les joueurs pour n'afficher que ceux qui ont le même id_equipe que celui présent dans l'URL
        const filteredJoueurs = res.data.filter(
          (joueur) => joueur.id_equipe === idEquipe
        );
        setJoueurs(filteredJoueurs);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des joueurs :", err)
      );
  }, [id]);

  return (
    <Grid
      width="100%"
      height="200px"
      templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
      gap={6}
      p={4}
    >
      {joueurs.map((joueur, index) => (
        <GridItem key={index}>
          <Box
            bg="gray.700"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            cursor="pointer"
            transition="transform 0.2s ease-in-out"
            _hover={{ transform: "scale(1.10)" }}
          >
            <Box p="6">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="md"
                textTransform="uppercase"
              >
                {joueur.pseudo}
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                Rôle: {joueur.role}
              </Box>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default CardsJoueurs;
