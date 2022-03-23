import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pokemonData from "../src/pokemonData.json";
import { Pokemon } from "../src/globalTypes";

export const PokemonCard = (props: { pokemon: Pokemon }) => {
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-bold text-center mb-4">
        {props.pokemon.name}
      </h1>

      <Link href={`/pokemon/${props.pokemon.id}`} passHref>
        <span className="cursor-pointer">
          <Image
            src={`/assets/images/${props.pokemon.name.toLowerCase()}.jpg`}
            alt={`${props.pokemon.name}`}
            height={300}
            width={300}
          />
        </span>
      </Link>
    </div>
  );
};

export default PokemonCard;
