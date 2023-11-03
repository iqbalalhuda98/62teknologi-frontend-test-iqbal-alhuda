import { useState, useEffect } from "react";
import queryString from "query-string";
import { useRouter } from "next/router";
import * as api from "../api/yelp-api/api";
import axios from "axios";

import CardPagination from "./components/card-pagination";
import Loading from "./components/loading";

const Search = (props) => {
  const { parameter } = props;
  // console.log("parameter", parameter);
  const router = useRouter();

  const [params, setParams] = useState(queryString.stringify(parameter));
  const [isLoading, setIsLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);

  const [inputSearch, setInputSearch] = useState({
    term: parameter.term,
    location: parameter.location,
  });
  const [inputFilter, setInputFilter] = useState({
    sort_by: "",
    open_now: false,
    price: "",
  });
  const [queryParams, setQueryParams] = useState({
    term: parameter.term,
    location: parameter.location,
    sort_by: "",
    open_now: false,
    price: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();

    setQueryParams({
      ...queryParams,
      term: inputSearch.term,
      location: inputSearch.location,
      sort_by: "",
      open_now: false,
      price: "",
    });
    setInputFilter({ ...inputFilter, sort_by: "", open_now: false, price: "" });
    setParams(queryString.stringify(inputSearch));
  };

  const handleFilter = (e) => {
    e.preventDefault();

    setQueryParams({
      ...queryParams,
      term: inputSearch.term,
      location: inputSearch.location,
      sort_by: inputFilter.sort_by,
      open_now: inputFilter.open_now,
      price: inputFilter.price,
    });
    setParams(queryString.stringify(inputSearch));
  };

  const handleReset = (e) => {
    e.preventDefault();

    setQueryParams({
      ...queryParams,
      term: inputSearch.term,
      location: inputSearch.location,
      sort_by: "",
      open_now: false,
      price: "",
    });
    setInputFilter({ ...inputFilter, sort_by: "", open_now: false, price: "" });
    setParams(queryString.stringify(inputSearch));
  };

  const fetchBusinesses = async () => {
    setBusinesses([]);
    setIsLoading(true);
    try {
      // const data = await api.get("/businesses/search", combinedInput);
      // setBusinesses(data.businesses);
      await axios
        .get("http://localhost:5000/v3/businesses/search", {
          params: {
            location: queryParams.location,
            term: queryParams.term,
            price: queryParams.price,
            open_now: queryParams.open_now,
            sort_by: queryParams.sort_by,
            limit: "30",
          },
        })
        .then((res) => {
          router.push("/businesses?" + params);
          setBusinesses(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, [queryParams]);

  // console.log("inputSearch", inputSearch);
  // console.log("inputFilter", inputFilter);
  // console.log("queryParams", queryParams);
  // console.log("businesses", businesses);

  return (
    <div className="container px-40 mt-14">
      <div className="relative">
        <div className="absolute bg-blue-500 blur-[1000px] left-0 top-1/4 rounded-full w-[400px] h-[400px] z-[-1]"></div>
      </div>
      <section>
        <form className="flex items-center mb-10" onSubmit={handleSearch}>
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
            disabled={isLoading}
            type="submit"
            className="px-4 py-3 ml-5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-500 disabled:border-gray-500"
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

      <section>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <CardPagination data={businesses} />
            {isLoading && <Loading />}
            {!isLoading && businesses.length == 0 && (
              <p className="text-center h-full flex items-center justify-center text-gray-500 text-md min-h-screen pb-56">
                Sorry, but we didn't find what you were looking for...
              </p>
            )}
          </div>
          <div className="col-span-1">
            <div className="ml-10 px-6 pt-6 pb-4 flex justify-end flex-col bg-blue-50 border border-gray-200 rounded-lg shadow">
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inputFilter.open_now}
                    className="sr-only peer"
                    onChange={() =>
                      setInputFilter({
                        ...inputFilter,
                        open_now: !inputFilter.open_now,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  <span className="ml-3 font-medium text-gray-900">Open</span>
                </label>
              </div>
              <div>
                <label
                  htmlFor="sort_by"
                  className="block mt-5 mb-2 font-medium text-gray-900"
                >
                  Sort by
                </label>
                <select
                  id="sort_by"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) =>
                    setInputFilter({ ...inputFilter, sort_by: e.target.value })
                  }
                  value={inputFilter.sort_by}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="best_match">Best Match</option>
                  <option value="rating">Rating</option>
                  <option value="review_count">Review Count</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="sort_by"
                  className="block mt-5 mb-2 font-medium text-gray-900"
                >
                  Price
                </label>
                <select
                  id="sort_by"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) =>
                    setInputFilter({ ...inputFilter, price: e.target.value })
                  }
                  value={inputFilter.price}
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="1">$</option>
                  <option value="2">$$</option>
                  <option value="3">$$$</option>
                  <option value="4">$$$$</option>
                </select>
              </div>
              <div className="flex justify-end mt-10">
                <button
                  disabled={isLoading}
                  type="button"
                  className="py-2 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  onClick={handleReset}
                >
                  Reset
                </button>
                <button
                  disabled={isLoading}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 focus:outline-none disabled:bg-gray-500 disabled:border-gray-500"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="w-full max-w-screen-xl mx-auto p-4 mt-20">
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2023{" "}
            <a href="https://www.62teknologi.com/" className="hover:underline">
              EnamDua™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export async function getServerSideProps(context) {
  let params = context.query ? context.query : "";

  return {
    props: {
      parameter: params,
    },
  };
}

export default Search;
