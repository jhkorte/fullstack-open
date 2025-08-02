import { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './components/Search'

function App() {
  
  const [newSearchValue, setNewSearchValue] = useState('')
  const [shown, setShown] = useState([])
  const [shownCountryInfo, setShownCountryInfo] = useState(null)

  const handleSearchChange = (e) => {
    setNewSearchValue(e.target.value)
    console.log('newSearchValue is: ', newSearchValue)
  }


  useEffect(() => {
    console.log('useEffect ran, newSearchValue is: ', newSearchValue)

    if (newSearchValue) {
      console.log('Searching now with newSearchValue: ', newSearchValue)
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const countryMatches = response.data.filter(countries => countries.name.common.toLowerCase().includes(newSearchValue.toLowerCase()))
          
          if (countryMatches.length > 10) {
            setShown(['Too many matches, please narrow down your search'])
            setShownCountryInfo(null)
          }
          else if (countryMatches.length > 1) {
            setShown(countryMatches.map(country => country.name.common))
            setShownCountryInfo(null)
          }
          else if (countryMatches.length === 1) {
            const countryMatch = countryMatches[0]
            setShown([countryMatch.name.common])
            axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryMatch.name.common.toLowerCase()}`)
            .then(response => {
              console.log(response.data)
              setShownCountryInfo(response.data)
            })
          }
          else {
            setShown(['No matches found with this search'])
            setShownCountryInfo(null)
          }

        })
    }
    console.log('shown is', )
  }, [newSearchValue])

  
  const goToCountry = (name) => {
    setNewSearchValue(name)
  }


  return (
    <div>
      <h1>Country search</h1>
      
      <Search 
        handleSearchChange={handleSearchChange}
        newSearch={newSearchValue}
      />

      <div>
        <h2>
        { //For future reference: added this conditionality, so that the 'show' button isn't there if already showing the contents of some country
        shown.length > 1 
        ?
        shown.map(name => (
          <div key={name}>{name}
          <button onClick={() => goToCountry(name)}>Show</button>
          </div>))
        :
          shown.map(name => (
          <div key={name}>{name}
          </div>
        ))}
        </h2>

        {shownCountryInfo ? `Capital: ${shownCountryInfo.capital}` : null } <br />
        {shownCountryInfo ? `Area: ${shownCountryInfo.area}` : null } <br />

        <h3>
          {shownCountryInfo ? `Languages` : null} <br />
        </h3>

        { //This checks that shownCountryInfo is not null before rendering the languages
          shownCountryInfo && (
            <ul>
              {Object.values(shownCountryInfo.languages).map(language => 
                <li key={language}> {language}  </li>
              )}
            </ul>
          )
        } 

        {
          shownCountryInfo && (
            <div>
              <img src ={shownCountryInfo.flags.png} alt={shownCountryInfo.flags.alt} />
            </div>
          )
        }
        
      </div>
  
    </div>
  )
}

export default App
