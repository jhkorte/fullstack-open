import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}


const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)


const App = () => {
  const header = 'give feedback'
  const header2 = 'statistics'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [pos, setPos] = useState(0)

  const actionFeedbackGood = () => {
    console.log('good feedback')
    console.log(good)
    setGood(good +1)
    setTotal(total +1)
    setAverage(average +1)
  }

  const actionFeedbackNeutral = () => {
    console.log('neutral feedback')
    console.log(neutral)
    setNeutral(neutral +1)
    setTotal(total +1)
    setAverage(average +0)
  }

  const actionFeedbackBad = () => {
    console.log('bad feedback')
    console.log(bad)
    setBad(bad +1)
    setTotal(total +1)
    setAverage(average -1)
  }

  return ( 
  <div>
    <div>
      <Header header = {header} />
      <Button onClick={actionFeedbackGood} text='good' />
      <Button onClick={actionFeedbackNeutral} text='neutral' />
      <Button onClick={actionFeedbackBad} text='bad' />
    </div>
    <div>
      <Header header = {header2} />
      <p>
        good {good} <br /> neutral {neutral} <br /> bad {bad} <br /> total {total} <br /> average {average / total} <br /> pos% {(good / total)*100} %
      </p>
    </div>
  </div>
  )
}

export default App