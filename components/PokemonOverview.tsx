import React from "react";

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

export const PokemonOverview = (props: { pokemon: Pokemon }) => {
  return <div>{props.pokemon.name.english}</div>;
};
