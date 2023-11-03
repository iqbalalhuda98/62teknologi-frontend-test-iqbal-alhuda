import { useState, useEffect } from "react";
import queryString from "query-string";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [inputSearch, setInputSearch] = useState({
    term: "",
    location: "",
  });
  const [params, setParams] = useState("");

  useEffect(() => {
    setParams(queryString.stringify(inputSearch));
  }, [inputSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push("/businesses?" + params);
  };

  return (
    <div className="container px-40 h-screen grid content-center">
      <div className="relative">
        <div className="absolute bg-blue-500 blur-[1000px] right-0 top-1/4 rounded-full w-[500px] h-[500px] z-[-1]"></div>
      </div>
      <section className="my-9">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">
          <span className="text-blue-700">Places </span>
          <span>to </span>
          <span className="text-blue-700">Go</span>
          <span>.</span>
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 text-center w-5/6 mx-auto">
          Returns up to 1000 businesses with some basic information based on the
          provided search criteria.
        </p>
      </section>
      <section className="mb-12">
        <form className="flex items-center" onSubmit={handleSearch}>
          <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-blue-50 border border-gray-300 rounded-l-lg">
            SEARCH
          </span>
          <div className="relative w-full mr-10">
            <input
              type="text"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Thins to do, Food, Starbucks, Barber, etc..."
              value={inputSearch.term}
              onChange={(e) => {
                setInputSearch({ ...inputSearch, term: e.target.value });
              }}
              required
            />
          </div>
          <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-blue-50 border border-gray-300 rounded-l-lg">
            NEAR
          </span>
          <div className="relative w-full">
            <input
              type="text"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Address, City, New York, Argentina, etc..."
              value={inputSearch.location}
              onChange={(e) => {
                setInputSearch({ ...inputSearch, location: e.target.value });
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-3 ml-5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </button>
        </form>
      </section>
    </div>
  );
}
