import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import Home from "./pages/Home";

import Joueurs from "./pages/Joueurs";
import CreateJoueurs from "./pages/Joueur/CreateJoueurs";
import UpdateJoueurs from "./pages/Joueur/UpdateJoueurs";

import Equipes from "./pages/Equipes";
import CreateEquipes from "./pages/Equipe/CreateEquipes";
import UpdateEquipes from "./pages/Equipe/UpdateEquipes";

import Matchs from "./pages/Matchs";
import CreateMatchs from "./pages/Match/CreateMatchs";
import UpdateMatchs from "./pages/Match/UpdateMatchs";
import ListeJoueurs from "./pages/ListeJoueurs";
import Tournois from "./pages/Tournois";
import CreateTournoi from "./pages/Tournoi/CreateTournois";
import UpdateTournoi from "./pages/Tournoi/UpdateTournois";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? <Home /> : <Login setIsLoggedIn={setIsLoggedIn} />
            }
          />

          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<Home />} />

          <Route path="/liste-joueurs/:id" element={<ListeJoueurs />} />

          <Route path="/joueur" element={<Joueurs />} />
          <Route path="/create-joueur" element={<CreateJoueurs />} />
          <Route path="/update-joueur/:id" element={<UpdateJoueurs />} />

          <Route path="/equipe" element={<Equipes />} />
          <Route path="/create-equipe" element={<CreateEquipes />} />
          <Route path="/update-equipe/:id" element={<UpdateEquipes />} />

          <Route path="/match" element={<Matchs />} />
          <Route path="/create-match" element={<CreateMatchs />} />
          <Route path="/update-match/:id" element={<UpdateMatchs />} />

          <Route path="/tournoi" element={<Tournois />} />
          <Route path="/create-tournoi" element={<CreateTournoi />} />
          <Route path="/update-tournoi/:id" element={<UpdateTournoi />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
