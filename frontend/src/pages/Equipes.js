import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Button,
  Image,
} from "@chakra-ui/react";
import { convertBufferToBase64 } from "../utils/convertBufferToBase64";
import Navigation from "../components/Navigation";

const Equipes = () => {
  const [equipes, setEquipes] = useState([]);
  const [error, setError] = useState(null);

  const [joueurs, setJoueurs] = useState([]);

  // Récupérer les données des équipes et des joueurs depuis le serveur
  useEffect(() => {
    // Récupérer les équipes
    axios
      .get("http://localhost:5000/equipes")
      .then((res) => {
        setEquipes(res.data);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des équipes");
        console.error("Erreur lors de la récupération des équipes :", err);
      });

    // Récupérer les joueurs
    axios
      .get("http://localhost:5000/joueurs")
      .then((res) => {
        setJoueurs(res.data);
      })
      .catch((err) => {
        setError("Erreur lors de la récupération des joueurs");
        console.error("Erreur lors de la récupération des joueurs :", err);
      });
  }, []);

  // Gérer la suppression d'une équipe
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/equipes/${id}`);
      setEquipes(equipes.filter((equipe) => equipe.id_equipe !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'équipe :", err);
      setError("Erreur lors de la suppression de l'équipe");
    }
  };

  // Convertir l'image en Base64 pour qu'elle s'affiche correctement
  const getImageSrc = (logo) => {
    if (logo && logo.data && logo.data.length > 0) {
      const base64String = convertBufferToBase64(logo.data);
      return `data:image/png;base64,${base64String}`;
    }
    return null;
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
        <Box width="80%" p={4}>
          <Box mb={8}>
            <Heading
              fontSize="40px"
              as="h2"
              size="lg"
              mb={10}
              textAlign="center"
            >
              Gestion des Équipes
            </Heading>
            {error && <p>{error}</p>}
            <TableContainer>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Équipe ID</Th>
                    <Th>Nom</Th>
                    <Th>Joueurs</Th>
                    <Th>Pays</Th>
                    <Th>Logo</Th>
                    <Th>Modification</Th>
                    <Th>Suppression</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {equipes.map((equipe, index) => (
                    <Tr key={equipe.id_equipe}>
                      <Td>{equipe.id_equipe}</Td>
                      <Td>{equipe.nom_equipe}</Td>
                      <Td>
                        {/* Afficher le nombre de joueurs de cette équipe */}
                        {
                          joueurs.filter(
                            (joueur) => joueur.id_equipe === equipe.id_equipe
                          ).length
                        }
                      </Td>
                      <Td>{equipe.pays}</Td>
                      <Td>
                        {equipe.logo && equipe.logo.data.length > 0 ? (
                          <Image
                            src={getImageSrc(equipe.logo)}
                            alt={`${equipe.nom_equipe} logo`}
                            style={{ height: "50px" }}
                          />
                        ) : (
                          <p>Logo non valide</p>
                        )}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="blue"
                          as={Link}
                          to={`/update-equipe/${equipe.id_equipe}`}
                        >
                          Modifier
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(equipe.id_equipe)}
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
                  to="/create-equipe"
                >
                  Ajouter une équipe
                </Button>
              </Flex>
            </TableContainer>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Equipes;
