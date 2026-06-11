import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    weatherService
      .getWeather(capital)
      .then((weatherData) => {
        setWeather(weatherData);
        setWeatherError(false);
      })
      .catch(() => {
        setWeatherError(true);
      });
  }, [capital]);

  if (weatherError) {
    return (
      <div className="weather-card">
        <h2>Weather</h2>
        <p>Weather data not available for this location.</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather-card">
        <h2>Weather</h2>
        <p>Loading weather...</p>
      </div>
    );
  }

  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>Weather in {capital}</h2>

      <p>
        <strong>Temperature:</strong> {weather.main.temp} °C
      </p>

      <img src={weatherIcon} alt={weather.weather[0].description} />

      <p>
        <strong>Wind:</strong> {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default Weather;
