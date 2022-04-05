import React, { useCallback, useMemo } from "react";
import PokemonCard from "./PokemonCard";
import useStore from "../src/store";
import PokemonTeamCard from "./PokemonTeamCard";

const Team = (props: any) => {
  const { pokemonArr } = useStore((state) => state.pokemon);
  const filteredPokemon = props.team.map((team: any) => team.pokemonId);

  const teamPokemon = filteredPokemon.map((pokemon: any) => {
    const index = pokemonArr.findIndex((p: any) => p.id === pokemon);
    return pokemonArr[index];
  });

  return (
    <>
      <div className="flex flex-wrap gap-4 border rounded-br-md rounded-bl-md p-3 justify-around mb-4">
        {teamPokemon.length > 0 && filteredPokemon ? (
          teamPokemon.map((pokemon: any, i: number) => (
            <PokemonTeamCard key={i} pokemon={pokemon} size={100} />
          ))
        ) : (
          <>
            <p>This team currently has no pokemon.</p>
            <p>Search for your favorite pokemon and add them!</p>
          </>
        )}
      </div>
    </>
  );
};

export default Team;
