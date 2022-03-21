import {
  SortAscendingIcon,
  FilterIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import { useRef, useState } from "react";
import useStore from "../src/fakeStore";
import { Pokemon } from "../src/globalTypes";
// import useStore from "../src/store";

export default function FilterHome() {
  const [sorted, setSorted] = useState(false);
  // const { setPokemonFilter } = useStore((state) => state.pokemon);
  const { setPokemonFilter } = useStore((state) => state);
  const filterInput = useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-lg mt-8">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Search Pokemon
      </label>
      <div className="mt-1 flex rounded-md shadow-md ">
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <div className="absolute inset-y-0 left-0 px-2 flex items-center pointer-events-none border-r border-gray-400">
            <FilterIcon className="h-5 w-5 text-white " aria-hidden="true" />
          </div>
          <input
            ref={filterInput}
            type="input"
            name="filterInput"
            id="filter"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded rounded-l-md pl-10 sm:text-sm bg-gray-800 py-2 text-white placeholder:text-gray-300"
            placeholder="Search for a pokemon..."
            onChange={() => setPokemonFilter(filterInput?.current?.value)}
          />
        </div>
      </div>
    </div>
  );
}
