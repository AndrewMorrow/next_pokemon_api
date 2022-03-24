/* This example requires Tailwind CSS v2.0+ */
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import { useEffect } from "react";
import useStore from "../src/store";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Pagination() {
  const {
    currentPage,
    setCurrentPage,
    setSliceAmount,
    sliceAmount,
    amountPerPage,
    filteredPage,
  } = useStore((state) => state.pagination);
  const { pokemonArr, filterInput, filteredPokemon } = useStore(
    (state) => state.pokemon
  );

  const handlePageChange = (newPageNum: number) => {
    const pageSkips = Math.abs(currentPage - newPageNum);
    const newSliceAmount =
      newPageNum > currentPage && newPageNum > 0
        ? amountPerPage * pageSkips
        : -amountPerPage * pageSkips;
    setCurrentPage(newPageNum);
    setSliceAmount(newSliceAmount);
    window.scrollTo({
      behavior: "smooth",
      left: 0,
      top: 0,
    });
  };

  const handleNextPage = (changeAmount: number) => {
    const newPage = currentPage + changeAmount;
    const newSliceAmount = changeAmount > 0 ? amountPerPage : -amountPerPage;
    setCurrentPage(newPage > 0 ? newPage : 1);
    setSliceAmount(newSliceAmount);
  };

  // useEffect(()=>{

  // }, [filterInput])

  const currPageType = filterInput ? filteredPage : currentPage;
  const pageAmount = filterInput
    ? filteredPokemon?.length / amountPerPage
    : pokemonArr?.length / amountPerPage;
  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 pb-6">
      <div className="-mt-px w-0 flex-1 flex">
        {currPageType > 1 && (
          <button
            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            onClick={() => handleNextPage(-1)}
          >
            <ArrowNarrowLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </button>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from(Array(Math.ceil(pageAmount)).keys())
          .slice(1)
          .map((num: number, i: number, arr) =>
            i < currPageType + 9 && i >= currPageType - 9 ? (
              <button
                key={i}
                className={classNames(
                  currPageType !== num
                    ? "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                    : "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                )}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ) : null
          )}

        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <button
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          onClick={() => handleNextPage(1)}
        >
          Next
          <ArrowNarrowRightIcon
            className="ml-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
