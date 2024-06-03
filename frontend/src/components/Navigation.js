import React from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom"; // Import de useNavigate

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("black", "white");
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  const handleLogout = () => {
    // Effacer les informations de connexion (par exemple, localStorage)
    localStorage.removeItem("authToken");
    // Rediriger vers la page de connexion
    navigate("/login");
  };

  return (
    <Box bg={bg} px={4} width="100%" position="absolute">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Link href="/home" fontSize="xl" fontWeight="bold" color={color}>
            Application de gestion d'événements eSports
          </Link>
        </Box>

        <Flex alignItems={"center"}>
          <Link href="/joueur" mx={4} color={color}>
            Gestion des joueurs
          </Link>
          <Link href="/equipe" mx={4} color={color}>
            Gestion des équipes
          </Link>
          <Link href="/match" mx={4} color={color}>
            Gestion des matchs
          </Link>
          <Link href="/tournoi" mx={4} color={color}>
            Gestion des tournois
          </Link>
          <Button onClick={toggleColorMode} ml={4}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button onClick={handleLogout} ml={4} colorScheme="red">
            Déconnexion
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
