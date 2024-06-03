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

const CreateTournois = () => {
  const [nom_tournoi, setNomTournoi] = useState("");
  const [date_debut, setDateDebut] = useState("");
  const [date_fin, setDateFin] = useState("");
  const [nombre_equipes, setNombreEquipes] = useState("");
  const [status, setStatus] = useState("");
  const [vainqueur, setVainqueur] = useState("");
  const [cash_prize, setCashPrize] = useState("");
  const [organisateur, setOrganisateur] = useState("");
  const [equipes, setEquipes] = useState([]);
  const navigate = useNavigate();

  // Récupérer la liste des équipes depuis le backend lors du chargement du composant
  useEffect(() => {
    axios
      .get("http://localhost:5000/equipes")
      .then((res) => {
        setEquipes(res.data); // Mettre à jour l'état avec les données récupérées
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateTournoi = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/tournois/create-tournoi",
        {
          nom_tournoi,
          date_debut,
          date_fin,
          nombre_equipes,
          status,
          vainqueur,
          cash_prize,
          organisateur,
        }
      );
      console.log(response);
      navigate("/tournoi");
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la création du tournoi:",
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
              Création d'un Tournoi
            </Heading>
            <FormControl id="nom_tournoi" mb={4}>
              <FormLabel>Nom du Tournoi</FormLabel>
              <Input
                type="text"
                value={nom_tournoi}
                onChange={(e) => setNomTournoi(e.target.value)}
              />
            </FormControl>
            <FormControl id="date_debut" mb={4}>
              <FormLabel>Date de début</FormLabel>
              <Input
                type="date"
                value={date_debut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </FormControl>
            <FormControl id="date_fin" mb={4}>
              <FormLabel>Date de fin</FormLabel>
              <Input
                type="date"
                value={date_fin}
                onChange={(e) => setDateFin(e.target.value)}
              />
            </FormControl>
            <FormControl id="nombre_equipes" mb={4}>
              <FormLabel>Nombre d'équipes</FormLabel>
              <Input
                type="number"
                value={nombre_equipes}
                onChange={(e) => setNombreEquipes(e.target.value)}
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
            <FormControl id="cash_prize" mb={4}>
              <FormLabel>Cash Prize</FormLabel>
              <Input
                type="text"
                value={cash_prize}
                onChange={(e) => setCashPrize(e.target.value)}
              />
            </FormControl>
            <FormControl id="organisateur" mb={4}>
              <FormLabel>Organisateur</FormLabel>
              <Input
                type="text"
                value={organisateur}
                onChange={(e) => setOrganisateur(e.target.value)}
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleCreateTournoi}>
              Créer
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateTournois;
