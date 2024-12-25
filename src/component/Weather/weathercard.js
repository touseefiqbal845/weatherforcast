import React, { useState, useEffect } from "react";

const Weathercard = ({
  temp,
  humidity,
  pressure,
  weathermood,
  name,
  speed,
  country,
  sunset,
  data,
  selectedDay,
  onDaySelect,
}) => {
  const [weatherState, setWeatherState] = useState("");
  const [selectedDayState, setSelectedDayState] = useState(null);

  useEffect(() => {
    if (weathermood) {
      switch (weathermood) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Mist":
          setWeatherState("wi-dust");
          break;
        default:
          setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [weathermood]);

  useEffect(() => {
    if (data && data.length > 0) {
      const firstDay = getFiveDaysData(data)[0];
      setSelectedDayState(firstDay);
    }
  }, [data]);

  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  const getFiveDaysData = (data) => {
    const today = new Date();
    return data.map((day, index) => {
      const forecastDate = new Date(
        today.getTime() + index * 24 * 60 * 60 * 1000
      );
      return {
        icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
        day: forecastDate.toLocaleDateString("en-US", { weekday: "long" }),
        date: forecastDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        description: day.weather[0].description,
        tempMax: day.main.temp_max,
        tempMin: day.main.temp_min,
        humidity: day.main.humidity,
        pressure: day.main.pressure,
        speed: day.wind.speed,
      };
    });
  };

  const fiveDaysData = getFiveDaysData(data);

  const handleDaySelect = (day) => {
    setSelectedDayState(day);
    if (onDaySelect) {
      onDaySelect(day);
    }
  };

  return (
    <div className="" style={{ marginTop: "10px" }}>
      <article className="widget">
        <div className="weatherIcon">
          <img
            src={selectedDayState?.icon}
            style={{ height: "100px" }}
            alt="Weather Icon"
          />
        </div>

        <div className="weatherInfo">
          <div className="temperature">
            <span>{selectedDayState?.tempMax}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">
              {selectedDayState ? selectedDayState.description : pressure || "No pressure data"}
            </div>
            <div className="place">
              {name}, {country}
            </div>
          </div>
        </div>

        <div className="date"> {selectedDayState?.date} </div>

        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr} PM <br />
                Sunset
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {selectedDayState ? selectedDayState.humidity : humidity} <br />
                Humidity
              </p>
            </div>
          </div>

          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {selectedDayState ? selectedDayState.pressure : pressure} <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {selectedDayState ? selectedDayState.speed : speed} <br />
                Wind Speed
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", marginTop: "20px",width:"100%",alignItems:"center",justifyContent:"center" }}>
          {fiveDaysData.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDaySelect(day)}
              style={{
                border: "1px solid #FFE484",
                padding: "10px",
                cursor: "pointer",
                background: selectedDayState?.date === day.date ? "#FFE484" : "#fff",
              }}
            >
              <h6>{day.day}</h6>
              <img src={day.icon} alt={day.description} />
              <p>
                {day.tempMax}&deg; / {day.tempMin}&deg;
              </p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Weathercard;
