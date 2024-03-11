import React from "react";
import Link from "next/link";
import Image from "next/image";

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
    <div className="hover:bg-yellow-500 hover:text-blue-800 border-yellow-600 border rounded-lg w-fit h-fit justify-center text-center w-52">
      <Link href={`/Pokemon/${name}`}>
        <div>
          <p className="text-gray-600 font-medium"> ID: {id}</p>
          <p className="text-center text-white">{name}</p>
          <Image src={imageUrl} alt={name} width={200} height={200} />
          <h2 className="text-xl font-bold">Type :</h2>
          <div>{types.join(", ")}</div>
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;



