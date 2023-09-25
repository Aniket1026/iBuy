import React,{useState} from "react";

export const Pagination = ({ currentPage, totalPage, setCurrentPage }) => {
    const [pageNumbers, setPageNumbers] = useState([1,2]);
    const hanleNextPage = (e) => { 
        console.log(totalPage);
        if(totalPage === pageNumbers[1]) return;
        setPageNumbers((prev) => ([prev[0] + 1, prev[1] + 1]));
        console.log(pageNumbers);
        console.log(e);
    }

    const hanlePrevPage = (e) => {
        if(pageNumbers[0] <= 1) return;
        setPageNumbers((prev) =>([prev[0] - 1, prev[1] - 1]));
        console.log(pageNumbers);
    }

  return (
    <nav
      aria-label="Page navigation example"
      className="flex flex-row justify-center items-center"
    >
      <ul className="list-style-none flex">
        <li>
          <button
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
            onClick={hanlePrevPage}
          >
            Previous
          </button>
        </li>
        <li>
          <button
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            onClick={() => setCurrentPage(pageNumbers[0])}
          >
            {pageNumbers[0]}
          </button>
        </li>
        <li aria-current="page">
          <button
            className="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300"
            onClick={() => setCurrentPage(pageNumbers[1])}
          >
            {pageNumbers[1]}
            <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
              (current)
            </span>
          </button>
        </li>
        <li onClick={hanleNextPage}>
          <button className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
