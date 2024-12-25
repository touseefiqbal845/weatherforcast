import React from 'react';

const Forecast = ({ data }) => {
    console.log("data",data)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {data.map((day, index) => {
        const weatherIcon = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
        });

        return (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
            <h3>{date}</h3>
            <img src={weatherIcon} alt={day.weather[0].description} />
            <p>High: {day.main.temp_max}°C</p>
            <p>Low: {day.main.temp_min}°C</p>

            <p>{day.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
