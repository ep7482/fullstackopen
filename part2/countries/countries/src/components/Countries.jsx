import Name from "./Name"
import Capital from "./Capital"
import Area from "./Area"
import Languages from "./Languages"
import Flag from "./Flag"
import Weather from "./Weather"

const BasicCountryInfo = ({country}) => {
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
  
const Country = (props) => {
    const country = props.count
    const isExpanded = props.expandCountries.includes(country.id)

    return (
        <div>
            {isExpanded ? (
                <>
                    <BasicCountryInfo country={country}/>
                    <button onClick={() => props.handleToggle(country.id)}>showLess</button>
                </>
            ) : props.len === 1 ? (
                <>
                    <BasicCountryInfo country={country}/>
                    <Weather country={country} len={props.len} />
                </>
            ) : (
                <>
                    <Name name={country.name}/>
                    <button onClick={() => props.handleToggle(country.id)}>show</button>
                </>
            )}
        </div>
    )
}
  
const Countries = (props) => {
    return (
        <>
            {(props.countriesToShow.length > 10) ? (
                <>
                    Too many matches, specify another filter
                </>
            ) : (
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
        </>
    )
}

export default Countries