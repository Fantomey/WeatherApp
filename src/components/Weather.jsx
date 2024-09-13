import { useState, useRef } from "react"


import "./Weather.css"
import "../index.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import rain_icon from "../assets/rain.png"
import wind_icon from "../assets/wind.png"
import snow_icon from "../assets/snow.png"
import humidity_icon from "../assets/humidity.png"
import { useEffect } from "react"

const Weather = () => {

    const VITE_API_KEY = "84e6eba6920d45dbdc16f50c5743d749";
    const [weather, setWeather] = useState(false);
    const inputRef = useRef()
    const debounceTimeoutRef = useRef(null);

    const allIcons = {
        "01": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10n": rain_icon,
        "10d": rain_icon,
        "13n": snow_icon,
        "13d": snow_icon,
    }

    const search = async (city) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${VITE_API_KEY}`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon
            setWeather({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {

        }
    }
    useEffect(() => {
        search("Ivano-Frankivsk")
    }, [])

    const handleInputChange = () => {
        clearTimeout(debounceTimeoutRef.current);
        debounceTimeoutRef.current = setTimeout(() => {
            search(inputRef.current.value);
        }, 800);
    };
    return (

        <div className={`weather`}>
            <div className="search-bar">
                <input type="text" placeholder="Search" ref={inputRef} onChange={handleInputChange} />
                <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            <img src={weather.icon} alt="" className="weather-icon" />
            <p className="temp" >{weather.temp}</p>
            <p className="location" >{weather.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div >
                        <p>{weather.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div >
                        <p>{weather.wind} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;


