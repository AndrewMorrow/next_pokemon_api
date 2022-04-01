import React from "react";
import PokemonCard from "./PokemonCard";
import useStore from "../src/store";
import PokemonTeamCard from "./PokemonTeamCard";

const Team = (props: any) => {
  const { pokemonArr } = useStore((state) => state.pokemon);
  const filteredPokemon = props.team.map((team: any) => team.pokemonId);
  const teamPokemon = pokemonArr.filter((pokemon: any) =>
    filteredPokemon.includes(pokemon.id)
  );
  return (
    <>
      <div className="flex flex-wrap gap-4 border rounded-br-md rounded-bl-md p-3 justify-around">
        {teamPokemon.map((pokemon: any) => (
          <PokemonTeamCard key={pokemon.id} pokemon={pokemon} size={100} />
        ))}
      </div>
    </>
  );
};

export default Team;
