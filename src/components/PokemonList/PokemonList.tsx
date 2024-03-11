import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';

interface PokemonListProps {
  pokemons: { id: number; imageUrl: string; name: string; types: string[] }[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;




  