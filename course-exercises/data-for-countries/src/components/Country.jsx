import Weather from "./Weather";

const Country = ({ filteredCountries }) => {
  const country = filteredCountries[0];
  const capital = country.capital?.[0];

  return (
    <div className="country-layout">
      <div className="country-card">
        <h1>{country.name.common}</h1>

        <div className="country-info">
          <p>
            <strong>Capital</strong>
            <br />
            {capital}
          </p>

          <p>
            <strong>Area</strong>
            <br />
            {country.area.toLocaleString()} km²
          </p>
        </div>

        <h2>Languages</h2>

        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>

        <img className="flag" src={country.flags.png} alt={country.flags.alt} />
      </div>

      <Weather capital={capital} />
    </div>
  );
};

export default Country;
