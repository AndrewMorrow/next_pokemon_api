import { produce } from "immer";
import create, { GetState, SetState } from "zustand";
import { devtools } from "zustand/middleware";
import PokemonCard from "../components/PokemonCard";
import { Pokemon } from "../src/globalTypes";

export type StoreSlice<T extends object, E extends object = T> = (
  set: SetState<E extends T ? E : E & T>,
  get: GetState<E extends T ? E : E & T>
) => T;

interface UserSlice {
  user: {
    id: string | null;
    firstName: string;
  };
}

const createUserSlice: StoreSlice<UserSlice> = (set, get) => ({
  user: {
    id: null,
    firstName: "Bob",
  },
});

interface PokemonSlice {
  pokemon: {
    id: string | null;
    pokemonArr: [];
    filterInput: string | null;
    filteredPokemon: [];
    setPokemon: (pokemonArr: [Pokemon]) => void;
    setPokemonFilter: (filterInput: string) => void;
  };
}

const createPokemonSlice: StoreSlice<PokemonSlice> = (set, get) => ({
  pokemon: {
    id: null,
    pokemonArr: [],
    filterInput: null,
    filteredPokemon: [],
    setPokemon: (pokemonArr: [Pokemon]) =>
      set(
        produce((state) => ({
          pokemon: {
            ...state.pokemon,
            pokemonArr,
          },
        }))
      ),
    setPokemonFilter: (filterInput: string) =>
      set(
        produce((state) => ({
          pokemon: {
            ...state.pokemon,
            filterInput,
            filteredPokemon: state.pokemon.pokemonArr.filter(
              (pokemon: Pokemon) =>
                pokemon.name.english
                  .toLowerCase()
                  .includes(filterInput.toLowerCase())
            ),
          },
        }))
      ),
  },
});

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createUserSlice(set, get),
  ...createPokemonSlice(set, get),
});

const useStore = create(devtools(createRootSlice));

export default useStore;
