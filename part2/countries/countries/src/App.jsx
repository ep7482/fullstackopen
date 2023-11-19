import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import './App.css'


function App() {
  const [countries, setCountries] = useState(null)
  const [value, setValue] = useState('')
  const [expandCountries, setExpandCountries] = useState([])

  useEffect(() => {
    console.log('fetching countries data')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const results = []
        response.data.forEach(country => {
          results.push({
            id: results.length + 1, 
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages === null || country.languages === undefined ? ['No languages present'] : Object.values(country.languages),
            flag: country.flags,
            latlng: country.latlng
          })
        })
        setCountries(results)
      })
  }, [])


  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }  

  const handleToggle = (id) => {
    setExpandCountries(prev => {
      const isExpanded = prev.includes(id)
      if (isExpanded) {
        return prev.filter(x => x !== id)
      } else {
        return [...prev, id]
      }
    })
  }
  
  console.log(expandCountries)
  
  if (!countries) {
    return null
  }

  const countryFilter = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange}></input>
      </form>
      <Countries
        countriesToShow={countryFilter}
        handleToggle={handleToggle}
        expandCountries={expandCountries}
      />
    </div>
  )
}

const Name = (props) => {
  if (props.len === 1) {
    return (
      <h2>{props.name}</h2>
    )
  }
  return (
    <>{props.name}</>
  )
}

const Capital = (props) => (
  <div><b>Capital: </b>{props.capital}</div>
)

const Area = (props) => (
  <div><b>Area: </b>{props.area}</div>
)

const Languages = (props) => {
  return (
    <div>
      <b>Languages:</b>
      {props.langs.map(lang =>
        <li key={props.langs.indexOf(lang)}>
          {lang}
        </li>
      )}
    </div>
  )
}

const Flag = (props) => (
  <div>
    <img src={props.flag.png} width="200" height="200"></img>
  </div>
)

const Country = (props) => {
  const country = props.count
  const isExpanded = props.expandCountries.includes(country.id)
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  const lat = country.latlng[0]
  const lng = country.latlng[1]
  const time = Date.now()
  const [weather, setWeather] = useState([])

  
  useEffect(() => {
    if (props.len === 1) {
      axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&dt=${time}&appid=${api_key}`)
        .then(response => {
          const countryWeather = {
            temp: response.current.temp,
            windSpeed: response.current.wind_speed,
            weth: response.current.weather
          }
          setWeather(countryWeather)
        })
    }
  }, [props.len === 1])

  console.log("Weather: ", weather)

  if (props.len === 1 || isExpanded) {
    return (
      <>
        <Name name={country.name}/>
        <Capital capital={country.capital}/>
        <Area area={country.area}/>
        <Languages langs={country.languages} />
        <Flag flag={country.flag}/>
        <button onClick={() => props.handleToggle(country.id)}>showLess</button>
      </>
    )
  }
  return (
    <div>
      <Name name={country.name}/>
      <button onClick={() => props.handleToggle(country.id)}>show</button>
    </div>
  )
}

const Countries = (props) => {
  if (props.countriesToShow.length > 10) {
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  }
  return (
    <>
      {props.countriesToShow.map(country => 
        <Country
          key={country.id}
          count={country}
          len={props.countriesToShow.length}
          handleToggle={props.handleToggle}
          expandCountries={props.expandCountries}
        />
      )}
    </>
  )
}

export default App
