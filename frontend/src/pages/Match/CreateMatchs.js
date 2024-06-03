import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Select,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import Navigation from "../../components/Navigation";

const CreateMatchs = () => {
  const [id_tournoi, setIDTournoi] = useState("");
  const [date, setDate] = useState("");
  const [score_equipe1, setScoreEquipe1] = useState("");
  const [score_equipe2, setScoreEquipe2] = useState("");
  const [vainqueur, setVainqueur] = useState("");
  const [phase, setPhase] = useState("");
  const [status, setStatus] = useState("");
  const [equipes, setEquipes] = useState([]);
  const [equipe1, setEquipe1] = useState("");
  const [equipe2, setEquipe2] = useState("");
  const navigate = useNavigate();

  const [tournois, setTournois] = useState([]);

  // Récupérer la liste des équipes depuis le backend lors du chargement du composant
  useEffect(() => {
    axios
      .get("http://localhost:5000/equipes")
      .then((res) => {
        setEquipes(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/tournois") // Notez le changement d'URL ici
      .then((res) => {
        console.log(res.data); // Afficher les données récupérées dans la console
        setTournois(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des tournois :", err)
      );
  }, []);

  const handleCreateMatch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/matchs/create-match",
        {
          id_tournoi,
          date,
          equipe1,
          equipe2,
          score_equipe1,
          score_equipe2,
          vainqueur,
          phase,
          status,
        }
      );
      console.log(response);
      navigate("/match");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création du match:",
        error
      );
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
          <Flex direction="column" align="stretch">
            <Heading as="h2" size="lg" mb={4}>
              Création d'un Match
            </Heading>
            <FormControl id="id_tournoi" mb={4}>
              <FormLabel>Id Tournoi</FormLabel>
              <Select
                placeholder="Sélectionnez un tournoi"
                value={id_tournoi}
                onChange={(e) => setIDTournoi(e.target.value)}
              >
                {tournois.map((tournoi) => (
                  <option key={tournoi.id_tournoi} value={tournoi.id_tournoi}>
                    {tournoi.nom_tournoi}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="date" mb={4}>
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </FormControl>
            <FormControl id="equipe1" mb={4}>
              <FormLabel>Equipe 1</FormLabel>
              <Select
                placeholder="Sélectionnez une équipe 1"
                value={equipe1}
                onChange={(e) => setEquipe1(e.target.value)}
              >
                {equipes.map((equipe) => (
                  <option key={equipe.id_equipe} value={equipe.id_equipe}>
                    {equipe.nom_equipe}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="equipe2" mb={4}>
              <FormLabel>Equipe 2</FormLabel>
              <Select
                placeholder="Sélectionnez une équipe 2"
                value={equipe2}
                onChange={(e) => setEquipe2(e.target.value)}
              >
                {equipes.map((equipe) => (
                  <option key={equipe.id_equipe} value={equipe.id_equipe}>
                    {equipe.nom_equipe}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="scoreEquipe1" mb={4}>
              <FormLabel>Score Équipe 1</FormLabel>
              <Input
                type="number"
                value={score_equipe1}
                onChange={(e) => setScoreEquipe1(e.target.value)}
              />
            </FormControl>
            <FormControl id="scoreEquipe2" mb={4}>
              <FormLabel>Score Équipe 2</FormLabel>
              <Input
                type="number"
                value={score_equipe2}
                onChange={(e) => setScoreEquipe2(e.target.value)}
              />
            </FormControl>
            <FormControl id="vainqueur" mb={4}>
              <FormLabel>Vainqueur</FormLabel>
              <Select
                placeholder="Sélectionnez le vainqueur"
                value={vainqueur}
                onChange={(e) => setVainqueur(e.target.value)}
              >
                {equipes.map((equipe) => (
                  <option key={equipe.id_equipe} value={equipe.id_equipe}>
                    {equipe.nom_equipe}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="phase" mb={4}>
              <FormLabel>Phase</FormLabel>
              <Input
                type="text"
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
              />
            </FormControl>
            <FormControl id="status" mb={4}>
              <FormLabel>Status</FormLabel>
              <Input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreateMatch}>
              Créer
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateMatchs;
