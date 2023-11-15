import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import './App.css'

function App() {
  const [countries, setCountries] = useState(null)
  const [value, setValue] = useState('')
  // const [countryInfo, setCountryInfo] = useState(null)

  useEffect(() => {
    console.log('fetching countries data')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const results = []
        response.data.forEach(country => {
          results.push({
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages === null || country.languages === undefined ? ['No languages present'] : Object.values(country.languages),
            flag: country.flags
          })
        })
        setCountries(results)
      })
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }  
  
  if (!countries) {
    return null
  }
  // const langs = countries.map(country => {
  //   const languages = country.languages
  //   if (languages === null || languages === undefined) {
  //     return ['No languages present']
  //   }
  //   return Object.values(languages)
  // })

  // console.log(countries)

  // console.log(countries.map(country => country.languages === null || country.languages === undefined ? ['No languages present'] : Object.values(country.languages)))
  // console.log(langs.map(lang => Object.values(lang)))
  // console.log(langs.forEach(languages => Object.values(languages)))

  let countriesToShow
  const countryFilter = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
  if (countryFilter.length <= 10 && value.length != 0) {
    countriesToShow = countryFilter
    if (countryFilter.length === 1) {
      console.log(countryFilter)
    }
  } else {
    countriesToShow = countries
  }
  // else if (value.length === 0) {
  //   countriesToShow = ["Please enter country"]
  // } else {
  //   countriesToShow = ["Too many matches, specify another filter"]
  // }

  console.log(countriesToShow)

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange}></input>
      </form>
      {countriesToShow.map(country =>
        <div key={country.name}>
          {country.name}
        </div>
      )}
    </div>
  )
}

export default App
