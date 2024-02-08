import React, { useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import thunder_icon from "../assets/thunder.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

export const WeatherApp = () => {
  let api_key = "d526b3ca5fea41b8b93f133c4046b0c2";

  const [wicon, setWicon] = useState(
    localStorage.getItem("weatherIcon") || cloud_icon
  );

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const tempertature = document.getElementsByClassName("wethear-temp");
    const location = document.getElementsByClassName("wethear-location");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    tempertature[0].innerHTML = Math.floor(data.main.temp) + " °c";
    location[0].innerHTML = data.name;

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "11d" ||
      data.weather[0].icon === "11n"
    ) {
      setWicon(thunder_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }

    setWicon(newIcon);
    localStorage.setItem("weatherIcon", newIcon);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center mt-4 gap-2">
        <input
          type="text"
          className="cityInput border-2 border-slate-400 bg-slate-100 rounded-full h-9 w-52 pl-3"
        />
        <button
          className="bg-white rounded-full p-2"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} />
        </button>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <div className="weather-icon flex flex-col items-center text-white font-bold">
          <img src={wicon} style={{ width: "120px", height: "120px" }} />
          <div className="wethear-temp text-6xl">24°</div>
          <div className="wethear-location">London</div>
        </div>

        <div className="flex justify-center gap-4 pl-4">
          <div className="flex items-center gap-4">
            <img
              src={humidity_icon}
              style={{ width: "20px", height: "20px" }}
            />
            <div className="text-white text-sm font-semibold">
              <div className="humidity-percent">64%</div>
              <div>Humedad</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img src={wind_icon} style={{ width: "24px", height: "24px" }} />
            <div className="text-white text-sm font-semibold">
              <div className="wind-rate">18 km</div>
              <div>Viento</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
