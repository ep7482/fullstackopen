import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Countries from './components/Countries'
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

// const Name = ({name, len}) => {
//   if (len === 1) {
//     return (
//       <h1>{name}</h1>
//     )
//   }
//   return (
//     <>{name}</>
//   )
// }

// const Capital = ({capital}) => (
//   <div><b>Capital: </b>{capital}</div>
// )

// const Area = ({area}) => (
//   <div><b>Area: </b>{area}</div>
// )

// const Languages = ({langs}) => {
//   return (
//     <div>
//       <b>Languages:</b>
//       {langs.map(lang =>
//         <li key={langs.indexOf(lang)}>
//           {lang}
//         </li>
//       )}
//     </div>
//   )
// }

// const Flag = ({flag}) => (
//   <div>
//     <img src={flag.png} width="300" height="200"></img>
//   </div>
// )

// const BasicCountryInfo = ({country}) => {
//   return (
//     <>
//       <Name name={country.name}/>
//       <Capital capital={country.capital}/>
//       <Area area={country.area}/>
//       <Languages langs={country.languages} />
//       <Flag flag={country.flag}/>
//     </>
//   )
// }

// const Country = (props) => {
//   const country = props.count
//   const isExpanded = props.expandCountries.includes(country.id)

//   return (
//     <div>
//       {isExpanded ? (
//         <>
//           <BasicCountryInfo country={country}/>
//           <button onClick={() => props.handleToggle(country.id)}>showLess</button>
//         </>
//       ) : props.len === 1 ? (
//         <>
//           <BasicCountryInfo country={country}/>
//           <Weather country={country} len={props.len} />
//         </>
//       ) : (
//         <>
//           <Name name={country.name}/>
//           <button onClick={() => props.handleToggle(country.id)}>show</button>
//         </>
//       )}
//     </div>
//   )
// }

// // const Weather = ({country, len}) => {
// //   const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
// //   const lat = country.latlng[0]
// //   const lng = country.latlng[1]
// //   const time = Date.now()
// //   const [weather, setWeather] = useState([])

  
// //   useEffect(() => {
// //     if (len === 1) {
// //       axios
// //         .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&dt=${time}&appid=${api_key}`)
// //         .then(response => {
// //           console.log(response)
// //           const countryWeather = {
// //             temp: response.data.current.temp,
// //             windSpeed: response.data.current.wind_speed,
// //             icon: response.data.current.weather[0].icon
// //           }
// //           setWeather(countryWeather)
// //         })
// //     }
// //   }, [len === 1])

// //   return (
// //     <>
// //       <h2>Weather in {country.capital}</h2>
// //       <div>temperature {weather.temp} Celcius</div>
// //       <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}/>
// //       <div>Wind {weather.windSpeed} m/s</div>
// //     </>
// //   )
// // }

// const Countries = (props) => {
//   return (
//     <>
//       {(props.countriesToShow.length > 10) ? (
//         <>
//           Too many matches, specify another filter
//         </>
//       ) : (
//         <>
//           {props.countriesToShow.map(country => 
//             <Country
//               key={country.id}
//               count={country}
//               len={props.countriesToShow.length}
//               handleToggle={props.handleToggle}
//               expandCountries={props.expandCountries}
//             />
//           )}
//         </>
//       )
//       }
//     </>
//   )
// }

export default App
