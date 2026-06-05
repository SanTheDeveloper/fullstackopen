import { useState, useEffect } from "react";
import Country from "./components/Country";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAllCountries().then((countryData) => {
      setCountries(countryData);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSelectedCountry(null);
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>🌍 Country Explorer</h1>
        <p>Search countries and view current weather</p>
      </header>

      <form className="search-form">
        <label>
          Search Country
          <input
            placeholder="Type a country name..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </label>
      </form>

      {selectedCountry ? (
        <Country filteredCountries={[selectedCountry]} />
      ) : (
        <>
          {filteredCountries.length > 10 && (
            <div className="info-message">
              Too many matches. Please narrow your search.
            </div>
          )}

          {filteredCountries.length > 1 && filteredCountries.length <= 10 && (
            <ul className="country-list">
              {filteredCountries.map((country) => (
                <li key={country.cca3}>
                  {country.name.common}
                  <button
                    className="show-btn"
                    type="button"
                    onClick={() => showCountry(country)}
                  >
                    Show
                  </button>
                </li>
              ))}
            </ul>
          )}

          {filteredCountries.length === 1 && (
            <Country filteredCountries={filteredCountries} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
