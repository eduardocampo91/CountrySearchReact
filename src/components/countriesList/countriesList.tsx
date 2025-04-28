import {
  ApolloClient,
  InMemoryCache,
  useLazyQuery,
  useQuery,
} from "@apollo/client";
import {
  ITEMS_PER_PAGE,
  LIST_COUNTRIES,
  SEARCH_COUNTRY_BY_NAME,
} from "../assets/const";
import { useEffect, useState } from "react";
import SearchBar from "../searchBar.tsx/searchBar";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com",
});

function CountriesList() {
  const {
    data: allData,
    loading: allLoading,
    error: allError,
  } = useQuery(LIST_COUNTRIES, { client });
  const [
    fetchSearchedCountries,
    { data: searchData, loading: searchLoading, error: searchError },
  ] = useLazyQuery(SEARCH_COUNTRY_BY_NAME, { client });

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed.length > 0) {
      fetchSearchedCountries({
        variables: { regex: `^${trimmed}` },
      });
    }
  }, [search, fetchSearchedCountries]);

  if (allError || searchError) {
    return <p>{(allError || searchError)?.message}</p>;
  }

  const countries = search.trim()
    ? searchData?.countries || []
    : allData?.countries || [];

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(countries.length / ITEMS_PER_PAGE);

  const paginatedCountries = search
    ? countries
    : countries.slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Countries</h2>

      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1); // Reset page on new search
        }}
        placeholder="Search countries..."
      ></SearchBar>

      <ul className="list-disc pl-5">
        {paginatedCountries.length ? (
          paginatedCountries.map((country: any) => (
            <li key={country.code}>
              <strong>{country.name}</strong> ({country.code}) -{" "}
              {country.continent.name}
            </li>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </ul>

      {!search && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CountriesList;
