import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pokemonData from "../src/pokemonData.json";
import { Pokemon } from "../src/globalTypes";

export const PokemonTeamCard = (props: { pokemon: Pokemon; size: number }) => {
  return (
    <div className="">
      <h1 className=" font-semibold text-center mb-2">{props?.pokemon?.name}</h1>

      <Link href={`/pokemon/${props?.pokemon?.id}`} passHref>
        <span className="cursor-pointer">
          <Image
            src={`/assets/images/${props?.pokemon?.name.toLowerCase()}.jpg`}
            alt={`${props?.pokemon?.name}`}
            height={props.size}
            width={props.size}
          />
        </span>
      </Link>
    </div>
  );
};

export default PokemonTeamCard;
