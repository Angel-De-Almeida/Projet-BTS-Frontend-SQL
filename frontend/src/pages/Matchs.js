import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  Button,
  Th,
  Tr,
  Table,
  Thead,
  Tbody,
  Td,
} from "@chakra-ui/react";
import Navigation from "../components/Navigation";

const Matchs = () => {
  const [matchs, setMatchs] = useState([]);
  const [equipes, setEquipes] = useState({});

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les matchs depuis votre backend
    axios
      .get("http://localhost:5000/matchs") // Notez le changement d'URL ici
      .then((res) => {
        console.log(res.data); // Afficher les données récupérées dans la console
        setMatchs(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des matchs :", err)
      );

    // Effectuer une requête GET pour récupérer les équipes depuis votre backend
    axios
      .get("http://localhost:5000/equipes") // Notez le changement d'URL ici
      .then((res) => {
        console.log(res.data); // Afficher les données récupérées dans la console
        const equipeMap = {};
        res.data.forEach((equipe) => {
          equipeMap[equipe.id_equipe] = equipe.nom_equipe; // Créer une map d'équipe avec l'ID comme clé et le nom comme valeur
        });
        setEquipes(equipeMap); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des équipes :", err)
      );
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/matchs/" + id);
      setMatchs(matchs.filter((match) => match.id_match !== id)); // Mettre à jour l'état des matchs après suppression
    } catch (err) {
      console.log(err);
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
        <Box width="80%">
          <Heading fontSize="40px" as="h2" size="lg" mb={10} textAlign="center">
            Gestion des Matchs
          </Heading>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Match ID</Th>
                <Th>Tournoi ID</Th>
                <Th>Date</Th>
                <Th>Équipe 1</Th>
                <Th>Équipe 2</Th>
                <Th>Score Équipe 1</Th>
                <Th>Score Équipe 2</Th>
                <Th>Vainqueur</Th>
                <Th>Phase</Th>
                <Th>Status</Th>
                <Th>Modification</Th>
                <Th>Suppression</Th>
              </Tr>
            </Thead>
            <Tbody>
              {matchs.map((match) => (
                <Tr key={match.id_match}>
                  <Td>{match.id_match}</Td>
                  <Td>{match.id_tournoi}</Td>
                  <Td>{new Date(match.date).toLocaleDateString()}</Td>
                  <Td>{equipes[match.equipe1]}</Td>
                  <Td>{equipes[match.equipe2]}</Td>
                  <Td>{match.score_equipe1}</Td>
                  <Td>{match.score_equipe2}</Td>
                  <Td>{match.vainqueur}</Td>
                  <Td>{match.phase}</Td>
                  <Td>{match.status}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      as={Link}
                      to={`/update-match/${match.id_match}`}
                    >
                      Modifier
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={(e) => handleDelete(match.id_match)}
                    >
                      Supprimer
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Flex justifyContent="center">
            <Button mt={10} colorScheme="green" as={Link} to="/create-match">
              Ajouter un match
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Matchs;
