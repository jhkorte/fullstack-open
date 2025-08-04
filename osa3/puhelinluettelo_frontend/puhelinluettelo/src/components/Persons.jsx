const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => (
        <div key={person.name}> 
        {person.name} 
        {'  '}
        {person.number}
        {'  '}
        <button onClick={() => props.deletePerson(person.id)}> Delete </button>
        </div>
      ))}
    </div>
  )
}

export default Persons