import {
  SortAscendingIcon,
  FilterIcon,
  SortDescendingIcon,
} from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { Pokemon } from "../src/globalTypes";
import useStore from "../src/store";

export default function FilterHome() {
  const [sorted, setSorted] = useState(false);
  const { setPokemonFilter } = useStore((state) => state.pokemon);
  const { resetSliceAmount, setFilteredPage } = useStore(
    (state) => state.pagination
  );
  const filterInput = useRef<HTMLInputElement>(null);

  const handleFilterChange = (currentValue: string | undefined) => {
    setFilteredPage(1);
    resetSliceAmount();

    setPokemonFilter(currentValue);
  };

  const handleClearFilter = () => {
    setPokemonFilter("");
    if (filterInput?.current?.value) filterInput.current.value = "";
  };

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
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full  rounded-l-md pl-12 sm:text-sm bg-gray-800 py-2 text-white placeholder:text-gray-300 border-r border-gray-200"
            placeholder="Search for a pokemon..."
            onChange={() => handleFilterChange(filterInput?.current?.value)}
          />
        </div>
        <button
          className=" py-2 px-2 border border-transparent shadow-sm text-sm font-medium rounded-br-md rounded-tr-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          onClick={() => handleClearFilter()}
        >
          Clear filter
        </button>
      </div>
    </div>
  );
}
