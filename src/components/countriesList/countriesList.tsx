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
import DropdownFilter from "../dropdownFilter/dropdownFilter";
import ModalCountryDetail from "../modalCountryDetails/modalCountryDetails";
import { Button } from "react-bootstrap";

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
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed.length > 0) {
      const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
      fetchSearchedCountries({
        variables: { regex: `^${capitalized}` },
      });
    }
  }, [search, fetchSearchedCountries]);

  if (allError || searchError) {
    return <p>{(allError || searchError)?.message}</p>;
  }

  const countries = search.trim()
    ? searchData?.countries || []
    : allData?.countries || [];

  const filteredCountries = countries.filter((country: any) => {
    const matchesCurrency = selectedCurrency
      ? country.currency === selectedCurrency
      : true;
    const matchesContinent = selectedContinent
      ? country.continent.name === selectedContinent
      : true;

    return matchesCurrency && matchesContinent;
  });

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);

  const paginatedCountries = search
    ? filteredCountries
    : filteredCountries.slice(startIndex, endIndex);

  const allCurrencies = Array.from(
    new Set(allData?.countries.map((country: any) => country.currency))
  ) as any;

  const allContinents = Array.from(
    new Set(allData?.countries.map((country: any) => country.continent.name))
  ) as any;

  const handleCountryClick = (country: any) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  return (
    <div className="container p-4">
      <h2 className="h3 mb-3">Countries</h2>

      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        placeholder="Search countries..."
      ></SearchBar>

      <div className="flex gap-4 mb-4">
        <DropdownFilter
          label="Filter by Currency"
          value={selectedCurrency}
          onChange={setSelectedCurrency}
          options={allCurrencies}
        />

        <DropdownFilter
          label="Filter by Continent"
          value={selectedContinent}
          onChange={setSelectedContinent}
          options={allContinents}
        />
      </div>

      <ul className="list-[square] pl-4 space-y-2 text-teal-800">
        {paginatedCountries.length ? (
          paginatedCountries.map((country: any) => (
            <li key={country.code} className="mb-2">
              <Button
                variant="outline-dark"
                onClick={() => handleCountryClick(country)}
              >
                <strong>{country.name}</strong> ({country.code}) -{" "}
                {country.continent.name} - {country.currency}
              </Button>
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
            className="btn btn-secondary disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-2">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="btn btn-secondary disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {selectedCountry && (
        <ModalCountryDetail
          show={showModal}
          country={selectedCountry}
          onHide={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CountriesList;
