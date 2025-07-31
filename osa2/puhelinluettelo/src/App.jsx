import { useEffect, useState } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Search from './components/Search'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'



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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)


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

    if (personAlreadyExists(persons, newPerson)) {
      console.log('person already exists')
      const confirmReplacement = window.confirm(`${newName} already exists in the phonebook. Replace the old number with ${newNumber}?`)
      if (!confirmReplacement) return

      //If replacement is to be done:

      console.log('confirm to replace number')

      const personToBeReplaced = persons.find(person => person.name === newName)
      
      const replacePersonObject = {
        name: newName,
        number: newNumber
      }

      console.log(`attempting to replace person '${personToBeReplaced.name}' of id '${personToBeReplaced.id}' and number '${personToBeReplaced.number}' with new number '${replacePersonObject.number}'`)

      personService
      .updateNumber(personToBeReplaced.id, replacePersonObject)
        .then(returnedPerson => {
          const updatedPersons = persons.map(person => person.id === returnedPerson.id ? returnedPerson : person)
          setPersons(updatedPersons)
          setPersonsToShow(updatedPersons)
        })

        setNotificationMessage(
          `Updated '${replacePersonObject.name}' with new number '${newNumber}'`
        )
        setNotificationType('good')
        setTimeout(() => {
          setNotificationMessage(null)
          setNotificationType(null)
        }, 5000)
    }

    else {
      // Rewrote this, now search works as intended when adding a new person to phonebook
      const updatedPersons = [...persons, newPerson]
      setPersons(updatedPersons)
      setPersonsToShow(updatedPersons)

      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons([...persons, returnedPerson])
            setPersonsToShow([...persons, returnedPerson])
          })

      setNotificationMessage(
        `Added '${personObject.name}'`
      )
      setNotificationType('good')
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationType(null)
      }, 5000)
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


  const deletePerson = (id) => {
    console.log(`attempting to delete ${id}`)
    const personToDelete = persons.find(p => p.id === id);
    personService
    .deleteItem(id)
    .then(() => {
      const updatedPersons = persons.filter(person => person.id !== id);
      setPersons(updatedPersons);
      setPersonsToShow(updatedPersons);

      setNotificationMessage(
        `Deleted '${personToDelete.name}'`
      )
      setNotificationType('good')

      setTimeout(() => {
        setNotificationMessage(null);
        setNotificationType(null);
      }, 5000)
    })
  }


  return (
    <div>

      <Notification message = {notificationMessage} type = {notificationType} />

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
        deletePerson={deletePerson}
      />

    </div>
  )
  
}

export default App