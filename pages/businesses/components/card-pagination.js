import { useEffect, useState } from "react";
import Card from "./card";

const CardPagination = (props) => {
  const businesses = props.data;

  const [dataFiltered, setDataFiltered] = useState([]);
  const [paginationData, setPaginationData] = useState({
    totalItems: 0,
    currentPage: 0,
    pageSize: 0,
    totalPages: 0,
    startPage: 0,
    endPage: 0,
    startIndex: 0,
    endIndex: 0,
    pages: [],
  });

  const paginate = (totalItems, currentPage, pageSize, maxPages) => {
    let totalPages = Math.ceil(totalItems / pageSize);

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage, endPage;

    if (totalPages <= maxPages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPages;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
      (i) => startPage + i
    );

    setPaginationData({
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    });
    setDataFiltered(businesses?.slice(startIndex, endIndex + 1));
  };

  useEffect(() => {
    paginate(businesses?.length, 1, 5, 10);
  }, [businesses]);

  const handlePageChange = (pd, paginationData) => {
    if (pd != paginationData.currentPage) {
      paginate(businesses?.length, pd, 5, 10);
    }
  };

  return (
    <>
      <Card data={dataFiltered} />
      {businesses?.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 mt-10">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {paginationData.startIndex + 1}{" "}
              </span>
              to{" "}
              <span className="font-medium">
                {paginationData.endIndex + 1}{" "}
              </span>
              of{" "}
              <span className="font-medium">{paginationData.totalItems} </span>
              results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                type="button"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={paginationData.currentPage == 1 ? true : false}
                onClick={() =>
                  handlePageChange(
                    paginationData.currentPage - 1,
                    paginationData
                  )
                }
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {paginationData.pages.map((pd, index) => (
                <button
                  key={index}
                  type="button"
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                    ${
                      pd == paginationData.currentPage
                        ? "z-10 bg-blue-700 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }
                  `}
                  onClick={() => handlePageChange(pd, paginationData)}
                >
                  {pd}
                </button>
              ))}
              <button
                type="button"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                disabled={
                  paginationData.currentPage == paginationData.totalPages
                    ? true
                    : false
                }
                onClick={() =>
                  handlePageChange(
                    paginationData.currentPage + 1,
                    paginationData
                  )
                }
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default CardPagination;
