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

const Tournois = () => {
  const [tournois, setTournois] = useState([]);
  const [equipes, setEquipes] = useState({});

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les tournois depuis votre backend
    axios
      .get("http://localhost:5000/tournois") // Notez le changement d'URL ici
      .then((res) => {
        console.log(res.data); // Afficher les données récupérées dans la console
        setTournois(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des tournois :", err)
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
      await axios.delete("http://localhost:5000/tournois/" + id);
      window.location.reload();
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
            Gestion des Tournois
          </Heading>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Tournoi ID</Th>
                <Th>Nom du Tournoi</Th>
                <Th>Date de début</Th>
                <Th>Date de fin</Th>
                <Th>Nombre d'équipes</Th>
                <Th>Status</Th>
                <Th>Vainqueur</Th>
                <Th>Cash Prize</Th>
                <Th>Organisateur</Th>
                <Th>Modification</Th>
                <Th>Suppression</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tournois.map((tournoi, i) => (
                <Tr key={i}>
                  <Td>{tournoi.id_tournoi}</Td>
                  <Td>{tournoi.nom_tournoi}</Td>
                  <Td>{new Date(tournoi.date_debut).toLocaleDateString()}</Td>
                  <Td>{new Date(tournoi.date_fin).toLocaleDateString()}</Td>
                  <Td>{tournoi.nombre_equipes}</Td>
                  <Td>{tournoi.status}</Td>
                  <Td>{tournoi.vainqueur}</Td>
                  <Td>{tournoi.cash_prize}</Td>
                  <Td>{tournoi.organisateur}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      as={Link}
                      to={`/update-tournoi/${tournoi.id_tournoi}`}
                    >
                      Modifier
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={(e) => handleDelete(tournoi.id_tournoi)}
                    >
                      Supprimer
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent="center">
            <Button mt={10} colorScheme="green" as={Link} to="/create-tournoi">
              Créer un tournoi
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Tournois;
