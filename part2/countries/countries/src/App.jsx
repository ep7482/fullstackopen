import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import './App.css'

function App() {
  const [countries, setCountries] = useState(null)
  const [value, setValue] = useState('')
  const [toggle, setToggle] = useState(false)
  const [currCountry, setCurrCountry] = useState('')

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

  const handleToggle = (event) => {
    console.log(toggle)
    setToggle(!toggle)
  }
  
  if (!countries) {
    return null
  }

  const countryFilter = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange}></input>
      </form>
      <Countries countriesToShow={countryFilter} handleToggle={handleToggle} toggle={toggle}/>
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
  if (props.len === 1) {
    return (
      <>
        <Name name={country.name}/>
        <Capital capital={country.capital}/>
        <Area area={country.area}/>
        <Languages langs={country.languages} />
        <Flag flag={country.flag}/>
      </>
    )
  }
  return (
    <div>
      <Name name={country.name}/>
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
        <Country key={country.id} count={country} len={props.countriesToShow.length}/>
      )}
    </>
  )
}

export default App
