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
  console.log(context);
  const pokemon = pokemonData.filter(
    (pokemon) => pokemon.id == context.params.id
  );

  return {
    props: {
      pokemon: pokemon[0],
    }, // will be passed to the page component as props
  };
}

export const PokemonOverview = (props: { pokemon: Pokemon }) => {
  console.log(props.pokemon);
  return <div>Poekmon Overvierw for {props.pokemon?.name?.english}</div>;
};

export default PokemonOverview;
