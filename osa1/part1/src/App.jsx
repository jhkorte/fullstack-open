const Hello = (props) => {
  return (
    <div>
      <p>
        Hei {props.name}, olet {props.age} vuotta vanha!
      </p>
    </div>
  )
}


const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now,a+b)
  console.log("Pidän konsolin aina auki");

  const nimi="Pekka"
  const ika=10

  return (
  <>
    <h1>Greetings</h1>
    <Hello name="Maya" age={a+b} />
    <Hello name={nimi} age={ika} />
  </>
  )
}

/*
const App = () => {
  const friends = [
    'Leevi','Venla'
  ]

  return (
    <div>
      <p>{friends}</p>
    </div>
  )
}
*/


export default App