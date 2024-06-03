import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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

const UpdateMatch = () => {
  const [idTournoi, setIDTournoi] = useState("");
  const [date, setDate] = useState("");
  const [equipe1, setEquipe1] = useState("");
  const [equipe2, setEquipe2] = useState("");
  const [scoreEquipe1, setScoreEquipe1] = useState("");
  const [scoreEquipe2, setScoreEquipe2] = useState("");
  const [vainqueur, setVainqueur] = useState("");
  const [phase, setPhase] = useState("");
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipes, setEquipes] = useState([]);
  const [tournois, setTournois] = useState([]);

  // Récupérer la liste des équipes et des tournois depuis le backend lors du chargement du composant
  useEffect(() => {
    axios
      .get("http://localhost:5000/equipes")
      .then((res) => {
        setEquipes(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/tournois")
      .then((res) => {
        console.log(res.data); // Afficher les données récupérées dans la console
        setTournois(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération des tournois :", err)
      );

    axios
      .get(`http://localhost:5000/matchs/${id}`)
      .then((res) => {
        const match = res.data;
        setIDTournoi(match.id_tournoi);
        setDate(match.date);
        setEquipe1(match.equipe1);
        setEquipe2(match.equipe2);
        setScoreEquipe1(match.score_equipe1);
        setScoreEquipe2(match.score_equipe2);
        setVainqueur(match.vainqueur);
        setPhase(match.phase);
        setStatus(match.status);
      })
      .catch((err) =>
        console.error("Erreur lors de la récupération du match :", err)
      );
  }, [id]);

  const handleUpdateMatch = () => {
    axios
      .put(`http://localhost:5000/matchs/update-match/${id}`, {
        id_tournoi: idTournoi,
        date,
        equipe1,
        equipe2,
        score_equipe1: scoreEquipe1,
        score_equipe2: scoreEquipe2,
        vainqueur,
        phase,
        status,
      })
      .then((res) => {
        console.log(res);
        navigate("/match");
      })
      .catch((err) =>
        console.error("Erreur lors de la mise à jour du match :", err)
      );
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
              Modification d'un Match
            </Heading>
            <FormControl id="id_tournoi" mb={4}>
              <FormLabel>Id Tournoi</FormLabel>
              <Select
                placeholder="Sélectionnez un tournoi"
                value={idTournoi}
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
              <FormLabel>Équipe 1</FormLabel>
              <Select
                placeholder="Sélectionnez une équipe"
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
              <FormLabel>Équipe 2</FormLabel>
              <Select
                placeholder="Sélectionnez une équipe"
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
                value={scoreEquipe1}
                onChange={(e) => setScoreEquipe1(e.target.value)}
              />
            </FormControl>
            <FormControl id="scoreEquipe2" mb={4}>
              <FormLabel>Score Équipe 2</FormLabel>
              <Input
                type="number"
                value={scoreEquipe2}
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
            <Button colorScheme="blue" onClick={handleUpdateMatch}>
              Mettre à jour
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default UpdateMatch;
