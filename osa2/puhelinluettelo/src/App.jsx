import { useEffect, useState } from 'react'
import axios from 'axios'


const PersonForm = (props) => {
  return (
    <div>
    <form onSubmit={props.handleAddPerson}>
        <div>
          Name: <input 
                  value={props.newName} 
                  onChange={props.handleNameChange} 
                />
        </div>
        <div>
          Number: <input 
                  value={props.newNumber}
                  onChange={props.handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit">Add to phonebook</button>
        </div>
      </form>
    </div>
  )
}


const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => (
        <div key={person.name}> {person.name} {person.number} </div>
      ))}
    </div>
  )
}


const Search = (props) => {
  return (
    <form onSubmit={props.handleSearchPersons}>
        <div>
          Search: <input
                    value={props.newSearch}
                    onChange={props.handleSearchChange}
                  />
        </div>
        <div>To see the full list, leave the search bar empty</div>
    </form>
  )
}



const App = () => {
  /* OLD: Hard-coded example data, keep this here for now in case something breaks
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  */

  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setPersonsToShow(response.data)
    })
  }
  console.log('render', persons.length, 'persons')

  useEffect(hook, [])


  const [personsToShow, setPersonsToShow] = useState([...persons])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const personAlreadyExists = (persons, newPerson) => {
    const matches = persons.filter(person => person.name === newPerson.name)
    return matches.length > 0
  }


  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName , number: newNumber}
    console.log(`persons before adding ${newName} ${newNumber}`, persons)

    if (!personAlreadyExists(persons, newPerson)) {
      // Rewrote this, now search works as intended when adding a new person to phonebook
      const updatedPersons = [...persons, newPerson]
      setPersons(updatedPersons)
      setPersonsToShow(updatedPersons)
    }

    else {
      console.log('person already exists')
      alert(`${newName} already exists!`)
    }

    setNewName('')
    setNewNumber('')
    
    console.log('calling search function through addPerson, with persons', persons)
  }


  const handleSearchPersons = (event) => {
    event.preventDefault()
    console.log('new search is', newSearch)
    console.log('search', persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())))
    setPersonsToShow(persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())))
    setNewSearch('')
  }

  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }



  return (
    <div>

      <h2>Phonebook</h2>


      <h3>Add a new person to the phonebook</h3>
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />


      <h3>Search</h3>
      <Search 
        handleSearchPersons={handleSearchPersons}
        handleSearchChange={handleSearchChange}
        newSearch={newSearch}
      />


      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
      />

    </div>
  )
  
}

export default App