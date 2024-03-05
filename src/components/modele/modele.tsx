// modele.tsx
export interface Pokemon {
  id: number; // Ajoutez une propriété id de type nombre
  name: string;
  imageUrl: string;
  types: Type[]; // Change the type of 'types' to match the Type definition
  
}

export type Type = "Normal" | "Fire" | "Water" | "Grass" | "Electric"; // Define the 'Type' type

// PokemonList.tsx
interface Props {
  pokemonList: Pokemon[];
  filterType: Type; // Change the type of 'filterType' to match the Type definition
}



