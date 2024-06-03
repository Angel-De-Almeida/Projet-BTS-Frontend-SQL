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

const Joueurs = () => {
  const [joueurs, setJoueurs] = useState([]);
  const [equipes, setEquipes] = useState({});

  useEffect(() => {
    // Effectuer une requête GET pour récupérer les joueurs depuis votre backend
    axios
      .get("http://localhost:5000/joueurs") // Notez le changement d'URL ici
      .then((res) => {
        console.log(res.data); // Afficher les données récupérées dans la console
        setJoueurs(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des joueurs :", err)
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
      await axios.delete("http://localhost:5000/joueurs/" + id);
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
            Gestion des Joueurs
          </Heading>
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Joueur ID</Th>
                <Th>Pseudo</Th>
                <Th>Rôle</Th>
                <Th>Equipe</Th>
                <Th>Modification</Th>
                <Th>Suppression</Th>
              </Tr>
            </Thead>
            <Tbody>
              {joueurs.map((data, i) => (
                <Tr key={i}>
                  <Td>{data.id_joueur}</Td>
                  <Td>{data.pseudo}</Td>
                  <Td>{data.role}</Td>
                  <Td>{equipes[data.id_equipe]}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      as={Link}
                      to={`/update-joueur/${data.id_joueur}`}
                    >
                      Modifier
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      onClick={(e) => handleDelete(data.id_joueur)}
                    >
                      Supprimer
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent="center">
            <Button
              mt={10}
              colorScheme="green"
              as={Link}
              to="/create-joueur"
              justifyContent="center"
            >
              Ajouter un joueur
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Joueurs;
