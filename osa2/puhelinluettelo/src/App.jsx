import { useState } from 'react'




const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


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
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleAddPerson}>
        <div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange} 
                />
        </div>
        <div>
          number: <input 
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
        {persons.map((person) => (
          <div key={person.name}>{person.name} {person.number} </div>
        ))}
      </div>
    </div>
  )
}

export default App