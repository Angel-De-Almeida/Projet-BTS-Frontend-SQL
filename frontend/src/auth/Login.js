import React, { useState } from "react";
import { Flex, Heading, Input, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setIsLoggedIn }) => {
  const [nom, setNom] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        nom,
        motdepasse,
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token); // Stockez le token ou toute information de connexion nécessaire
        setIsLoggedIn(true);
        navigate("/home");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <Flex
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="gray.900" // Utilisation de bg pour définir la couleur de fond
    >
      <Flex
        as="form"
        direction="column"
        bg="gray.700"
        p={12}
        rounded={6}
        onSubmit={handleSubmit}
      >
        <Heading mb={6} color="white">
          Se connecter
        </Heading>
        <Input
          placeholder="Nom d'utilisateur"
          variant="filled"
          mb={3}
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <Input
          placeholder="Mot de passe"
          variant="filled"
          mb={6}
          type="password"
          value={motdepasse}
          onChange={(e) => setMotdepasse(e.target.value)}
        />
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
        <Button mb={6} colorScheme="teal" type="submit">
          Se connecter
        </Button>
        <Button colorScheme="blue" as={Link} to="/signup">
          S'inscrire
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
