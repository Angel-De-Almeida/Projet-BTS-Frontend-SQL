import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { convertBufferToBase64 } from "../utils/convertBufferToBase64";

const CardsEquipes = () => {
  const [equipes, setEquipes] = useState([]);

  const [joueurs, setJoueurs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/equipes")
      .then((res) => {
        console.log(res.data);
        setEquipes(res.data);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des équipes :", err)
      );

    // Récupérer les joueurs
    axios
      .get("http://localhost:5000/joueurs")
      .then((res) => {
        setJoueurs(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des joueurs :", err);
      });
  }, []);

  const getImageSrc = (logo) => {
    if (logo && logo.data && logo.data.length > 0) {
      const base64String = convertBufferToBase64(logo.data);
      return `data:image/png;base64,${base64String}`;
    }
    return null;
  };

  return (
    <Flex width="100%" flexWrap="wrap" justifyContent="center">
      {equipes.map((equipe, index) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="md"
          cursor="pointer"
          transition="transform 0.2s ease-in-out"
          _hover={{ transform: "scale(1.10)" }}
          width="250px"
          height="400px"
          margin="10px"
          fontSize="lg"
        >
          <Link to={`/liste-joueurs/${equipe.id_equipe}`}>
            {equipe.logo && equipe.logo.data.length > 0 && (
              <Image
                src={getImageSrc(equipe.logo)}
                alt={`${equipe.nom_equipe} logo`}
                style={{
                  height: "60%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            )}
            <Box p="6">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="md"
                textTransform="uppercase"
              >
                {equipe.nom_equipe}
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                Pays: {equipe.pays}
              </Box>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                Nombre de joueurs :{" "}
                {
                  joueurs.filter(
                    (joueur) => joueur.id_equipe === equipe.id_equipe
                  ).length
                }
              </Box>
            </Box>
          </Link>
        </Box>
      ))}
    </Flex>
  );
};

export default CardsEquipes;
