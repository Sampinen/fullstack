
import { useState, useEffect } from 'react'
const apiKey = import.meta.env.VITE_API_KEY
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

async function GetData() {
  let endpoint = baseUrl
  const request = await fetch(endpoint)
  const response = await request.json()
  console.log('respond')
  console.log(response)
  return response
}

async function WeatherReport (city) {
  let endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
  const request = await fetch(endpoint)
  const response = await request.json()
  return (response)
}

const CountryList = ({countriesToShow}) => {
  const [showCountry,setCountry] = useState(null)
  let showCountries
  if (showCountry) {
    return <CountryData country={showCountry} />
  }
  return (
    <>
      <ul>
        {countriesToShow.map(country =>
        <p key={country.ccn3}> 

          {country.name.official} 
            <button onClick={() =>setCountry(country)}>
              show
            </button>
        </p>
        ) }
      </ul>
    </>
  )
}

const CountryData = ({country}) => {
  const languages = Object.values(country.languages)
  const [weather, setWeather] = useState(null)
  const cap = country.capital[0]
    useEffect(() => {
    WeatherReport(cap).then(data => {
      setWeather(data)
    }).catch(error => {
      console.log(error.response?.data)
    })
    }, [])
    console.log(weather)

  return (
    <>
      <h1>{country.name.official} </h1>
      <p>Capital: {country.capital.toString()}

      </p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
      {languages.map(lang => <li>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather Today:</h2>
      {weather ? (
      <>
      <p>Temparature: {weather.current.temp_c} C</p>
      <img src={weather.current.condition.icon}alt={weather.current.condition.text}></img>
      <p>Wind: {weather.current.wind_kph} m/s</p>
      </>
      ):
      <p>loading weather</p>}


    </>
  )
}



const CountrySearch = ({countriesToShow}) => {
  const [buttonClick,setButtonclick] = useState(false)

  let countries
  if (countriesToShow.length > 10) {
      countries= "Too many results"

  } else if (countriesToShow.length > 1){
    countries = <CountryList countriesToShow = {countriesToShow} />
  }
  else if (countriesToShow.length === 1) {
    countries = <CountryData country = {countriesToShow[0]}/>
  }
  else {
    countries= "Nothing to show"
  }

  return (
    <>
      {countries}
    </>
  )
}


const FilterForm = ({searchValue,updateSearchValue}) => {
  return(
      <form>
    find countries: <input 
    id ="searchinput"
    value={searchValue}
    onChange={updateSearchValue}/>
    </form>
  )
}


const App = () => {
    const [countries, setCountries] = useState([]) 

    const [searchValue, setSearchValue] = useState('')
    console.log('countries')
    console.log(countries)
    const countriesToShow = 
    searchValue === ""
    ? countries
    : countries.filter(country => country.name.official.includes(searchValue))
    useEffect(() => {
    GetData().then(data => {
      setCountries(data)
    })
    }, [])
    console.log(countries.length)

    const updateSearchValue = (event) => {
    console.log("search value: " + event.target.value)
    setSearchValue(event.target.value)
  }

    return(
      <div>
      <FilterForm 
      searchValue={searchValue}
      updateSearchValue= {updateSearchValue}/>
      <CountrySearch countriesToShow={countriesToShow} />
      </div>

    )

}


export default App
