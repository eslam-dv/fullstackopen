import axios from "axios";
import { useState, useEffect } from "react";

const CountryName = ({ country }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && <Country country={country} />}
    </div>
  );
};

const Country = ({ country }) => {
  const capital = country.capital[0];
  const api_key = process.env.W_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&mode=json&units=metric&appid=${api_key}`;
  const [weather, setWeather] = useState({
    icon: "",
    temp: 0,
    wind: 0,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      const request = await axios.get(weatherUrl);
      if (request.statusText !== "OK") {
        console.log("error");
      }
      const data = await request.data;
      setWeather({
        temp: data.main.temp,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        wind: data.wind.speed,
      });
    };
    fetchWeather();
  }, []);

  return (
    <div className="country-info">
      <h2>{country.name.common}</h2>
      <p>capital: {capital}</p>
      <p>area: {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
      <h3>Weather in {capital}</h3>
      <p>Temprature: {weather.temp} Celcius </p>
      <img src={weather.icon} />
      <p>Wind: {weather.wind} m/s</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

  useEffect(() => {
    axios.get(`${baseUrl}/api/all`).then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  const onSearch = (e) => {
    setSearch(e.target.value);
    setFilteredCountries(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <div>
        find countries <input value={search} onChange={onSearch} />
      </div>
      <div>
        {filteredCountries.length >= 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <Country
            key={filteredCountries[0].cca2}
            country={filteredCountries[0]}
          />
        ) : (
          filteredCountries.map((c) => <CountryName key={c.cca2} country={c} />)
        )}
      </div>
    </>
  );
};

export default App;
