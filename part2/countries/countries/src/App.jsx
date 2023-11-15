import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import './App.css'

function App() {
  const [countries, setCountries] = useState(null)
  const [value, setValue] = useState('')
  // const [capital, setCapital] = useState('')
  // const [area, setArea] = useState('')
  // const [langs, setLangs] = useState([])
  // const [flag, setFlag] = useState('')
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

  let countriesToShow, capital, area
  let langs = []
  let flag = {png : ''}
  const countryFilter = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))
  if (countryFilter.length <= 10 && value.length != 0) {
    countriesToShow = countryFilter
    // console.log(countriesToShow.length)
    if (countriesToShow.length === 1) {
      capital = countriesToShow[0].capital[0]
      area = countriesToShow[0].area
      flag = countriesToShow[0].flag
      langs = countriesToShow[0].languages
      // console.log(capital, area, flag, langs)
    }
  } else {
    countriesToShow = countries
    capital = ''
    area = ''
    // flag = {png: ''}
    langs = []
  }
  // console.log(flag)
  // else if (value.length === 0) {
  //   countriesToShow = ["Please enter country"]
  // } else {
  //   countriesToShow = ["Too many matches, specify another filter"]
  // }

  // console.log(countriesToShow)
  console.log(langs)
  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange}></input>
      </form>
      {countriesToShow.map(country =>
        <div key={country.name}>
          {country.name}
          <div>{capital}</div>
          <div>{area}</div>
          <div>{langs.map(lang => {
            <li>
              {lang}
            </li>
          })}</div>
          <img src={flag.png} width="200" height="200"></img>
        </div>
      )}
    </div>
  )
}

export default App
