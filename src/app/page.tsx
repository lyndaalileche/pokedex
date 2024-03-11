// @ts-nocheck
"use client";

// @ts-nocheck
import React, { useState, useEffect } from "react";
import Link from "next/link";
import TypeFilter from "@/components/PokemonTypeFilter/PokemonTypeFilter";
import PokemonList from "@/components/PokemonList/PokemonList";

const Page: React.FC = () => {
  const [pokemons, setPokemons] = useState([]);

  // Ajout d'une interface pour le type de données des pokémons
  interface Pokemon {
    id: number;
    imageUrl: string;
    name: string;
    types: string[];
  }

  const [filterType, setFilterType] = useState("all");

  // Exemple à suivre pour crée un message d'erreur en fonction de l'erreur recontrer
  /*if (pokemons != "") {
    throw new (Error as string)('Pokemon details not found');
  }*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0"
        );
        const data = await response.json();
        const fetchedPokemons = await Promise.all(
          data.results.map(async (pokemon: any) => {
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();
            return {
              id: detailsData.id,
              imageUrl: detailsData.sprites.front_default,
              name: pokemon.name,
              types: detailsData.types.map((type: any) => type.type.name),
            };
          })
        );
        setPokemons(fetchedPokemons);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (type: string) => {
    setFilterType(type);
  };

  return (
    <div>
      <h1 className="text-xxl text-5xl font-bold xl:first-letter: text-center">
        POKEDEX
      </h1>
      <Link href="/app/Pokemon/[name]" as="/app/Pokemon/name">
        PokemonCard
      </Link>
      <TypeFilter onFilterChange={handleFilterChange} />
      <PokemonList
        pokemons={pokemons.filter(
          (pokemon) =>
            filterType === "all" || pokemon.types.includes(filterType)
        )}
      />
    </div>
  );
};

export default Page;
