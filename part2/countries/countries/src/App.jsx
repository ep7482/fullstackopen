import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
// import './App.css'

function App() {
  const [countries, setCountries] = useState(null)
  const [value, setValue] = useState('')

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

  const countryFilter = countries.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))

  return (
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange}></input>
      </form>
      <Countries countriesToShow={countryFilter}/>
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
    <div>{props.name}</div>
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
  if (props.len === 1) {
    return (
      <div>
      <Name name={props.name} len={props.len}/>
      <Capital capital={props.capital}/>
      <Area area={props.area}/>
      <Languages langs={props.langs} name={props.name}/>
      <Flag flag={props.flag}/>
    </div>
    )
  }
  return (
    <div>
      <Name name={props.name}/>
    </div>
  )
}

const Countries = (props) => {
  if (props.countriesToShow.length === 1) {
    return (
      <div>
        {props.countriesToShow.map(country => 
          <Country
            key={country.name}
            name={country.name}
            capital={country.capital}
            area={country.area}
            langs={country.languages}
            flag={country.flag}
            len={props.countriesToShow.length}
          />
        )}
      </div>
    )
  } else if (props.countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  return (
    <div>
      {props.countriesToShow.map(country =>
        <Country 
          key={country.name}
          name={country.name}
          len={props.countriesToShow.length}
        />
      )}
    </div>
  )
}

export default App
