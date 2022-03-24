import { stat } from "fs";
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
              (pokemon: Pokemon) => {
                if (!filterInput) return false;
                return pokemon.name
                  .toLowerCase()
                  .includes(filterInput.toLowerCase());
              }
            ),
          },
        }))
      ),
  },
});

interface PaginationSlice {
  pagination: {
    currentPage: number;
    setCurrentPage: (newPage: number) => void;
    sliceAmount: number;
    setSliceAmount: (amount: number) => void;
    amountPerPage: number;
    filteredPage: number;
    setFilteredPage: (newPage: number) => void;
    resetSliceAmount: () => void;
  };
}

const createPaginationSlice: StoreSlice<PaginationSlice> = (set, get) => ({
  pagination: {
    currentPage: 1,
    setCurrentPage: (newPage: number) =>
      set(
        produce((state) => ({
          pagination: {
            ...state.pagination,
            currentPage: newPage,
          },
        }))
      ),
    filteredPage: 1,
    setFilteredPage: (newPage: number) =>
      set(
        produce((state) => ({
          pagination: {
            ...state.pagination,
            filteredPage: newPage,
          },
        }))
      ),
    sliceAmount: 0,
    setSliceAmount: (amount) =>
      set(
        produce((state) => ({
          pagination: {
            ...state.pagination,
            sliceAmount: state.pagination.sliceAmount + amount,
          },
        }))
      ),
    resetSliceAmount: () =>
      set(
        produce((state) => ({
          pagination: {
            ...state.pagination,
            sliceAmount: 0,
          },
        }))
      ),
    amountPerPage: 18,
  },
});

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createUserSlice(set, get),
  ...createPokemonSlice(set, get),
  ...createPaginationSlice(set, get),
});

const useStore = create(devtools(createRootSlice));

export default useStore;
