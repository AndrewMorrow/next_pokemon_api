import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import pokemonData from "../src/pokemonData.json";
import { Pokemon } from "../src/globalTypes";
import { FaTrashAlt } from "react-icons/fa";

export const PokemonTeamCard = (props: {
  pokemon: Pokemon;
  size: number;
  team: any;
  setUserTeamList: Function;
}) => {
  const handleDeleteFromTeam = async (pokemonId: number) => {
    const pokemonOnTeam = props.team.pokemon.find(
      (p: any) => p.pokemonId === pokemonId
    );

    await fetch("/api/pokemon/team/deleteFromTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pokemonOnTeamId: pokemonOnTeam.id }),
    });

    const res = await fetch("/api/user/getUserTeams");
    const data = await res.json();
    props.setUserTeamList(data.userTeams);
  };

  return (
    <div className="flex flex-col">
      <h1 className=" font-semibold text-center mb-2">
        {props?.pokemon?.name}
      </h1>

      <Link href={`/pokemon/${props?.pokemon?.id}`} passHref>
        <span className="cursor-pointer mb-1.5">
          <Image
            src={`/assets/images/${props?.pokemon?.name.toLowerCase()}.jpg`}
            alt={`${props?.pokemon?.name}`}
            height={props.size}
            width={props.size}
          />
        </span>
      </Link>
      <button
        className="flex justify-center w-full text-center bg-gray-800 text-white rounded-md p-1 self-center cursor-pointer"
        onClick={() => handleDeleteFromTeam(props.pokemon.id)}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default PokemonTeamCard;
