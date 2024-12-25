import React, { useState, useEffect } from "react";
import axios from "axios";
import Weathercard from "./weathercard";
import "./style.css";

const WeatherAppByNuhTeck = () => {
  const [searchValue, setSearchValue] = useState("Lahore");
  const [tempInfo, setTempInfo] = useState({});
  const [forecast, setForecast] = useState([]);
  const [selectedDay, setSelectedDay] = useState("wednesday");

  const getWeatherInfo = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e54f30a1a838872feb6a7efd075a2ac9`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=e54f30a1a838872feb6a7efd075a2ac9`;

      const forecastResponse = await axios.get(forecastUrl);
      const forecastData = forecastResponse.data.list.filter(
        (_, index) => index % 8 === 0
      );
      setForecast(forecastData);

      if (forecastData.length > 0) {
        const currentDayData = forecastData.find(
          (day) =>
            new Date(day.dt * 1000).toLocaleDateString() ===
            new Date().toLocaleDateString()
        );
        setSelectedDay(currentDayData || forecastData[0]);
      }

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [searchValue]);

  return (
    <>
      <div className="flex">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      <Weathercard
        {...tempInfo}
        temp={tempInfo}
        data={forecast}
        selectedDay={selectedDay}
        onDaySelect={setSelectedDay}
      />
      <div></div>
    </>
  );
};

export default WeatherAppByNuhTeck;
