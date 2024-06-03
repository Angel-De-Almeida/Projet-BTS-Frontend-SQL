import React, { useState } from "react";
import axios from "axios";
import { Flex, Heading, Input, Button, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom"; // Import de useNavigate

const Signup = () => {
  const [nom, setNom] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [error, setError] = useState(""); // Définition de l'état error
  const navigate = useNavigate(); // Utilisation de useNavigate

  const handleCreateUser = () => {
    axios
      .post("http://localhost:5000/users/signup", {
        nom, // Utilisation de l'état nom pour le nom d'utilisateur
        motdepasse, // Utilisation de l'état motdepasse pour le mot de passe
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setError("Une erreur s'est produite lors de l'inscription");
      });
  };

  return (
    <Flex
      bg="gray.900" // Couleur de fond bleu foncé
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex as="form" direction="column" bg="gray.700" p={12} rounded={6}>
        <Heading mb={6}>Inscription</Heading>
        <Input
          type="text" // Correction du type pour le nom d'utilisateur
          variant="filled"
          placeholder="Nom d'utilisateur"
          mb={3}
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <Input
          variant="filled"
          mb={6}
          type="password"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
        />
        {error && (
          <Text color="red.500" mb={4}>
            {error}
          </Text>
        )}
        <Button mb={6} colorScheme="teal" onClick={handleCreateUser}>
          S'inscrire
        </Button>
        <Button as={Link} to="/login">
          Retour
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signup;
