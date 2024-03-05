import React from 'react';

// Définissez le type de données attendu pour les props du composant TypeFilter
interface TypeFilterProps {
  // onFilterChange est une fonction qui prend un type de chaîne comme argument et ne retourne rien (void)
  onFilterChange: (type: string) => void;
}

// Définissez le composant TypeFilter
const TypeFilter: React.FC<TypeFilterProps> = ({ onFilterChange }) => {
  // Créez une fonction qui sera appelée lorsque la sélection change
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Appelez la fonction onFilterChange passée en prop avec la valeur sélectionnée
    onFilterChange(event.target.value);
  };

  // Retourne un élément <select> avec des options pour chaque type de Pokémon
  return (
    <select    className='bg-gradient-to-b from-teal-500 to-teal-700 border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl p-4 m-2 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 flex flex-col justify-center items-center'
    onChange={handleFilterChange}
  >
      <option value="all">All</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      <option value="grass">Grass</option>
      <option value="electric">Electric</option>
    </select>
  );
};

// Exportez le composant TypeFilter
export default TypeFilter;


