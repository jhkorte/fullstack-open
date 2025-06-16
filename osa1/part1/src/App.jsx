import { useState } from 'react'


const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age
  
  return (
    <div>
      <p>
        Hei {name}, olet {age} vuotta vanha!
      </p>
      <p>
        Synnyit varmaankin vuonna {bornYear()}
      </p>
    </div>
  )
}


const Display = (props) => {
  return (
    <div>
      {props.counter}
    </div>
  )
}


const Button = (props) => {
  return (
    <button onClick={props.onClickAction}>
      {props.text}
    </button>
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

  const [ counter, setCounter ] = useState(0)

  const counterIncrement = () => setCounter(counter + 1)
  const counterDecrement = () => setCounter(counter - 1)
  const counterSetZero = () => setCounter(0)

  /*
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )
  */

  return (
  <div>
    <h1>Tervehdys</h1>
    
    <Hello name="Maya" age={26 + 10} />
    <Hello name={nimi} age={ika} />
    <Hello name="ihme ukkeli" age={counter} />

    <div>
      <Display counter={counter} />
      <Button
        onClickAction={counterIncrement} 
        text='Counter++' 
      />
      <Button 
        onClickAction={counterDecrement} 
        text='Counter--' 
      />
      <Button 
        onClickAction={counterSetZero}
        text='Reset' 
      />
    </div>

  </div>
  )
}


export default App