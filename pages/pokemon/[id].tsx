import Image from "next/image";
import React from "react";
import pokemonData from "../../src/pokemonData.json";

interface Pokemon {
  id: 1;
  name: {
    english: string;
    japanese: string;
    chinese: string;
    french: string;
  };
  type: [string];
  base: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}

export async function getServerSideProps(context: any) {
  // console.log(context);
  const pokemon = pokemonData.filter(
    (pokemon) => pokemon.id == context.params.id
  );

  return {
    props: {
      pokemon: pokemon[0],
    }, // will be passed to the page component as props
  };
}

// interface Props {
//   pokemon: Pokemon;
// }

const PokemonOverview = ({ pokemon }: { pokemon: Pokemon }) => {
  // console.log(pokemon);
  return (
    <div className="md:grid grid-cols-2 my-10">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-bold ">{pokemon.name.english}</h1>
        <Image
          src={`/assets/images/${pokemon.name.english.toLowerCase()}.jpg`}
          alt={pokemon.name.english}
          width={400}
          height={400}
        />
      </div>
      <div className="pl-6">
        <h2 className="text-lg font-bold mb-4">Info</h2>
        <div className="flex">
          <h3 className="mb-6 font-semibold mr-2">Type:</h3>
          <ul className="flex gap-1">
            {pokemon.type.map((type, i) => (
              <li key={pokemon.id}>
                {type}
                {i !== pokemon.type.length - 1 && ","}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-10 lg:gap-20">
          <div className="flex flex-col">
            <h3 className="mb-2 font-semibold">Stats</h3>
            <ul className="space-y-1">
              <li>hp: {pokemon.base.hp}</li>
              <li>attack: {pokemon.base.attack}</li>
              <li>defense: {pokemon.base.defense}</li>
              <li>special_attack: {pokemon.base.special_attack}</li>
              <li>special_defense: {pokemon.base.special_defense}</li>
              <li>speed: {pokemon.base.speed}</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-semibold">Translations</h3>
            <ul className="space-y-1">
              <li>english: {pokemon.name.english}</li>
              <li> japanese: {pokemon.name.japanese}</li>
              <li> chinese: {pokemon.name.chinese}</li>
              <li> french: {pokemon.name.french}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonOverview;
