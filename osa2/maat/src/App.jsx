import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Search from './components/Search'

function App() {
  
  // Note to self: newSearchValue is the value in the search bar in real time, country is what is searched in the end
  const [newSearchValue, setNewSearchValue] = useState('')
  const [country, setCountry] = useState(null)
  const [shown, setShown] = useState([])
  const [shownCountryInfo, setShownCountryInfo] = useState(null)


  const handleSearch = (e) => {
    e.preventDefault()
    setCountry(newSearchValue)
  }

  const handleSearchChange = (e) => {
    setNewSearchValue(e.target.value)
    console.log('newSearchValue is: ', newSearchValue)
  }


  //TODO: make into real time
  useEffect(() => {
    console.log('useEffect ran, country is: ', country)

    if (country) {
      console.log('Searching now with country: ', country)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          if (response.data.filter(countries => countries.name.common.toLowerCase().includes(country.toLowerCase())).length > 10) {
            setShown(['Too many matches, please narrow down your search'])
          }
          else if (response.data.filter(countries => countries.name.common.toLowerCase().includes(country.toLowerCase())).length > 1) {
            setShown(response.data
              .filter(countries => countries.name.common.toLowerCase().includes(country.toLowerCase()))
              .map(country => country.name.common)
            )
          }
          else {
            setShown(response.data
              .filter(countries => countries.name.common.toLowerCase().includes(country.toLowerCase()))
              .map(country => country.name.common)
            )
            axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${shown[0].toLowerCase()}`)
            .then(response => {
              console.log(response)
              console.log(shown[0].toLowerCase())
              setShownCountryInfo(response)
            })
          }
        })
    }
    console.log('shown is', shown)
  }, [country])

  
  return (
    <div>
      <h1>Country search</h1>
      
      <Search 
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
        newSearch={newSearchValue}
      />

      <pre>
        DEBUG: <br />
        {JSON.stringify(shown, null, 2)}
      </pre>
      
      <div>
        {shown.map(name => (
          <div key={name}>{name}</div>
        ))}
      </div>
  
    {
      //TODO: Render the info of country 
    }

    </div>
  )
}

export default App
