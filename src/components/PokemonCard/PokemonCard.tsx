import React from "react";

interface PokemonCardProps {
  id: number;
  imageUrl: string;
  name: string;
  types: string[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  imageUrl,
  name,
  types,
}) => {
  return (
    <div className="hover:bg-yellow-500 hover:text-blue-800
    
     border-yellow-600 border rounded-lg w-fit h-fit justify-center text-center w-52">
      <p className="text-gray-600 font-medium"> ID: {id}</p>
      <p  className="text-center text-white">{name}</p>
      
      <img src={imageUrl} alt={name} />

      <h2 className="text-xl font-bold">Type :</h2>
      <div>{types.join(", ")}</div>
    </div>
  );
};

export default PokemonCard;
