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


const Display = ({ counter }) => {
  return (
    <div>
      {counter}
    </div>
  )
}


const Button = (props) => { 
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

/*
const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now,a+b)
  console.log("Pidän konsolin aina auki");

  const nimi="Pekka"
  const ika=10

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const counterIncrement = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const counterDecrement = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }

  const counterSetZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

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
*/


const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        use the app by pressing buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


/*
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(updatedRight + left) 
  }

    


  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right}
        <History allClicks={allClicks} />      
        </div>
    </div>
  )
}
*/

const App = (props) => {
  const [value, setValue] = useState(10)


  const hello = (who) => {
    const handler = () => {
      console.log('hello', who)
    }
    return handler
  }

  return (
    <div>
      {value}

      <button onClick={hello('world')}>button</button>
      <button onClick={hello('react')}>button</button>
      <button onClick={hello('function')}>button</button>
    </div>
  )
}

export default App