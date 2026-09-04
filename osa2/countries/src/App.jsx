
import { useState, useEffect } from 'react'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

async function GetData() {
  let endpoint = baseUrl
  const request = await fetch(endpoint)
  const response = await request.json()
  console.log('respond')
  console.log(response)
  return response
}

const CountryList = ({countriesToShow}) => {

  return (
    <>
      <ul>
        {countriesToShow.map(country =>
        <p key={country.ccn3}> 
          {country.name.official} 
        </p>
        ) }
      </ul>
    </>
  )
}

const CountryData = ({country}) => {
  const languages = Object.values(country.languages)

  console.log(languages)


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

    </>
  )
}



const CountrySearch = ({countriesToShow}) => {
  let countries
  if (countriesToShow.length > 10) {
      countries= "Too many results"

  } else if (countriesToShow.length > 1){
    countries = <CountryList countriesToShow = {countriesToShow}/>

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

    const [searchValue, setSearchValue] = useState([])
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
