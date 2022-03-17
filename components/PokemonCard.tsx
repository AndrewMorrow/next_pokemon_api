import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pokemonData from "../src/pokemonData.json";

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

export const PokemonCard = (props: { pokemon: Pokemon }) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-center">
        {props.pokemon.name.english}
      </h1>

      <Link href={`/pokemon/${props.pokemon.id}`} passHref>
        <span className="cursor-pointer">
          <Image
            src={`/assets/images/${props.pokemon.name.english.toLowerCase()}.jpg`}
            alt={`${props.pokemon.name.english}`}
            height={300}
            width={300}
          />
        </span>
      </Link>
    </div>
  );
};

export default PokemonCard;
