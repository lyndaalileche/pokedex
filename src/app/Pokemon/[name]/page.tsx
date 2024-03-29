// @ts-ignore
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../loading";
import Error from "@/app/error";
import Image from "next/image";

// Définir l'interface pour les détails de l'espèce du Pokémon
interface PokemonSpeciesDetails {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  varieties: { is_default: boolean; pokemon: { name: string; url: string } }[];
  shape: { name: string };
  color: { name: string };
  egg_groups: { name: string }[];
}

// Définir l'interface pour les détails du Pokémon
interface PokemonDetails {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
  description: string;
  abilities: string[];
  hiddenAbilities: string[];
  height: number;
  weight: number;
  shape: string;
  color: string;
  eggGroups: string[];
}

const PokemonDetailsPage: React.FC = () => {
  // État pour stocker les détails du Pokémon et les erreurs éventuelles
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fonction pour charger les détails du Pokémon
    const fetchPokemonDetails = async () => {
      try {
        // Extrait le nom du Pokémon du chemin d'URL
        const pathSegments = window.location.pathname.split("/");
        const pokemonName = pathSegments[pathSegments.length - 1];

        // Vérifie si le nom du Pokémon est une chaîne de caractères valide
        if (pokemonName && typeof pokemonName === "string") {
          // Requête API pour obtenir les détails de l'espèce du Pokémon
          const speciesResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
          );
          const speciesData: PokemonSpeciesDetails = speciesResponse.data;
          const description =
            speciesData.flavor_text_entries.find(
              (entry) => entry.language.name === "en"
            )?.flavor_text || "No description available";
          const pokemonVariety = speciesData.varieties.find(
            (variety) => variety.is_default
          );
          const pokemonUrl = pokemonVariety?.pokemon.url;

          if (pokemonUrl) {
            const pokemonResponse = await axios.get(pokemonUrl);
            const pokemonData = pokemonResponse.data;

            // Récupérer les capacités du Pokémon
            const abilities = pokemonData.abilities.map(
              (ability: { ability: { name: string } }) => ability.ability.name
            );
            const hiddenAbilities = pokemonData.abilities
              .filter((ability: { is_hidden: boolean }) => ability.is_hidden)
              .map(
                (ability: { ability: { name: string } }) => ability.ability.name
              );

            // Mettre à jour l'état avec les détails du Pokémon
            setPokemonDetails({
              id: pokemonData.id,
              name: pokemonData.name,
              types: pokemonData.types,
              sprites: pokemonData.sprites,
              description: description,
              abilities: abilities,
              hiddenAbilities: hiddenAbilities,
              height: pokemonData.height,
              weight: pokemonData.weight,
              shape: speciesData.shape.name,
              color: speciesData.color.name,
              eggGroups: speciesData.egg_groups.map((group) => group.name),
            });
          }
        }
      } catch (error) {
        // Gère les erreurs lors de la requête API
        console.error(`Erreur lors de la récupération des détails :`, error);
        setError(
          "Une erreur s'est produite lors du chargement des détails du Pokémon. Veuillez réessayer plus tard."
        );
      }
    };

    // Appelle la fonction pour charger les détails du Pokémon
    fetchPokemonDetails();
  }, []); // Aucune dépendance, ne s'exécute qu'au rendu initial

  // Si une erreur est survenue, afficher le composant d'erreur

  // Si le nom du Pokémon ou les détails du Pokémon sont indisponibles, affiche un message de chargement
  if (!pokemonDetails) {
    return <Loading />;
  }

  // Affiche les détails du Pokémon
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "20px",
        color: "#333",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          color: "#3f51b5",
          marginBottom: "20px",
          textTransform: "capitalize",
        }}
      >
        {pokemonDetails.name}
      </h1>
      <p>ID : {pokemonDetails.id}</p>
      <p>
        Types :{" "}
        {pokemonDetails.types.map((type) => (
          <span
            key={pokemonDetails.id}
            style={{
              backgroundColor: "#e0e0e0",
              borderRadius: "5px",
              padding: "2px 6px",
              marginRight: "5px",
            }}
          >
            {type.type.name}
          </span>
        ))}
      </p>
      <Image
        src={pokemonDetails.sprites.front_default}
        alt={`${pokemonDetails.name} sprite`}
        style={{
          width: "200px",
          borderRadius: "50%",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      />
      <p>Description: {pokemonDetails.description}</p>
      <p
        style={{
          color: "#fff",
          backgroundColor: "#3f51b5",
          borderRadius: "5px",
          padding: "5px",
          margin: "10px 0",
        }}
      >
        Poids : {pokemonDetails.weight / 10} kg
      </p>
      <p
        style={{
          color: "#fff",
          backgroundColor: "#3f51b5",
          borderRadius: "5px",
          padding: "5px",
          margin: "10px 0",
        }}
      >
        Taille : {pokemonDetails.height / 10} m
      </p>
      <p>
        Capacités :{" "}
        {pokemonDetails.abilities.map((ability, index) => (
          <span
            key={index}
            style={{
              backgroundColor: "#f44336",
              color: "#fff",
              borderRadius: "5px",
              padding: "2px 6px",
              marginRight: "5px",
            }}
          >
            {ability}
          </span>
        ))}
      </p>
      <p>Couleur : {pokemonDetails.color}</p>
      <p>Groupes d œufs : {pokemonDetails.eggGroups.join(", ")}</p>
    </div>
  );
};

export default PokemonDetailsPage;
