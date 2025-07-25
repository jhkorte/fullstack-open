import { useState } from 'react'




const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

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
      setPersons([...persons, newPerson])
      //console.log('persons after adding', persons)
    }

    else {
      console.log('person already exists')
      alert(`${newName} ${newNumber} already exists!`)
    }

    setNewName('')
    setNewNumber('')

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
      <form onSubmit={handleSearchPersons}>
        <div>
          Search: <input
                    value={newSearch}
                    onChange={handleSearchChange}
                  />
        </div>
        <div>To see the full list, leave the search bar empty</div>
      </form>


      <h2>Add a new person to the phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          Name: <input 
                  value={newName} 
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          Number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}
                  />
        </div>
        <div>debug: {newName} {newNumber} </div>
        <div>
          <button type="submit">Add to phonebook</button>
        </div>
      </form>


      <h2>Numbers</h2>
      <div>
        {personsToShow.map((person) => (
          <div key={person.name}> {person.name} {person.number} </div>
        ))}
      </div>

    </div>
  )
}

export default App