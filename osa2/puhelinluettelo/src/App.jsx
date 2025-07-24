import { useState } from 'react'




const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')


  const personAlreadyExists = (persons, newPerson) => {
    const matches = persons.filter(person => person.name === newPerson.name)
    return matches.length > 0
  }

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    console.log('persons before adding', persons)
    if (!personAlreadyExists(persons, newPerson)) {
      setPersons([...persons, newPerson])
      setNewName('')
      //console.log('persons after adding', persons)
    }

    else {
      console.log('person already exists')
      setNewName('')
      alert(`${newName} already exists!`)
    }
    
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
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
        <div>debug: {newName}</div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <div key={person.name}>{person.name}</div>
        ))}
      </div>
    </div>
  )
}

export default App