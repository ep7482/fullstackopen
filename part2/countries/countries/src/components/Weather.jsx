import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country, len}) => {
    const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
    const lat = country.latlng[0]
    const lng = country.latlng[1]
    const time = Date.now()
    const [weather, setWeather] = useState([])


    useEffect(() => {
        if (len === 1) {
            axios
                .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&dt=${time}&appid=${api_key}`)
                .then(response => {
                    console.log(response)
                    const countryWeather = {
                        temp: response.data.current.temp,
                        windSpeed: response.data.current.wind_speed,
                        icon: response.data.current.weather[0].icon
                    }
                    setWeather(countryWeather)
                })
        }
    }, [len === 1])

    return (
        <>
            <h2>Weather in {country.capital}</h2>
            <div>temperature {weather.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
            <div>Wind {weather.windSpeed} m/s</div>
        </>
    )
}

export default Weather