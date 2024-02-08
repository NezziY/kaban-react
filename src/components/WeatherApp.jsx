import React, { useState, useEffect } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import thunder_icon from "../assets/thunder.png";
import humidity_icon from "../assets/humidity.png";

export const WeatherApp = () => {
  let api_key = "d526b3ca5fea41b8b93f133c4046b0c2";

  const [wicon, setWicon] = useState(cloud_icon);
  const [temp, setTemp] = useState("");
  const [location, setLocation] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();

    setTemp(Math.floor(data.main.temp));
    setLocation(data.name);
    setWind(Math.floor(data.wind.speed));
    setHumidity(data.main.humidity);

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" || data.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" || data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" || data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" || data.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" || data.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      data.weather[0].icon === "11d" || data.weather[0].icon === "11n"
    ) {
      setWicon(thunder_icon);
    } else if (
      data.weather[0].icon === "13d" || data.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(clear_icon);
    }
  };

  useEffect(() => {
    // Cargar los datos del localStorage cuando el componente se monta
    const savedTemp = localStorage.getItem("temp");
    if (savedTemp) setTemp(savedTemp);

    const savedLocation = localStorage.getItem("location");
    if (savedLocation) setLocation(savedLocation);

    const savedWind = localStorage.getItem("wind");
    if (savedWind) setWind(savedWind);

    const savedHumidity = localStorage.getItem("humidity");
    if (savedHumidity) setHumidity(savedHumidity);
  }, []);

  // Guardar los datos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("temp", temp);
  }, [temp]);

  useEffect(() => {
    localStorage.setItem("location", location);
  }, [location]);

  useEffect(() => {
    localStorage.setItem("wind", wind);
  }, [wind]);

  useEffect(() => {
    localStorage.setItem("humidity", humidity);
  }, [humidity]);

  return (
    <div className="flex flex-col items-center">
      <div className="pt-2 relative mx-auto text">
        <input
          type="text"
          className="cityInput border-2 border-slate-300 bg-white h-10 px-5 pr-16 rounded-full text-sm focus:outline-none"
        />
        <button
          className="absolute right-0 top-0 mt-5 mr-4"
          onClick={() => {
            search();
          }}
        >
          <img
            src={search_icon}
            className="text-gray-600 h-4 w-4 fill-current"
          />
        </button>
      </div>

      <div className="flex flex-col justify-center">
        <div className="wethear-location text-white font-bold text-2xl">
          {location}
        </div>
        <div className="weather-icon flex items-center text-white font-bold">
          <img src={wicon} style={{ width: "120px", height: "120px" }} alt="weather icon" />
          <div className="wethear-temp text-6xl">{temp}°</div>
        </div>

        <div className="flex justify-center gap-4 pl-4">
          <div className="flex items-center gap-4">
            <img
              src={humidity_icon}
              style={{ width: "20px", height: "20px" }}
              alt="humidity icon"
            />
            <div className="text-white text-sm font-semibold">
              <div className="humidity-percent">{humidity}%</div>
              <div>Humedad</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <img src={wind_icon} style={{ width: "24px", height: "24px" }} alt="wind icon" />
            <div className="text-white text-sm font-semibold">
              <div className="wind-rate">{wind} km/h</div>
              <div>Viento</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
