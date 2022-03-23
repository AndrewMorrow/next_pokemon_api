/* This example requires Tailwind CSS v2.0+ */
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import useStore from "../src/store";

export default function Pagination() {
  const { currentPage, setCurrentPage } = useStore((state) => state.pagination);

  const handlePageChange = (change: number) => {
    const newPage = currentPage + change;
    setCurrentPage(newPage < 1 ? 1 : newPage);
  };

  return (
    <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 py-10">
      <div className="-mt-px w-0 flex-1 flex">
        {currentPage > 1 && (
          <button
            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            onClick={() => handlePageChange(-1)}
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
        <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
          1
        </button>
        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
        <button
          className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
          aria-current="page"
        >
          2
        </button>
      </div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        <button
          className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
          onClick={() => handlePageChange(1)}
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
