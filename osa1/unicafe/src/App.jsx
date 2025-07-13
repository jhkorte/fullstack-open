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


const StatisticLine = (props) => (
  <div>
      {props.text} {props.value}
  </div>
)


const Statistics = (props) => {
  if ((props.statistics[0].value == 0) && (props.statistics[1].value == 0) && (props.statistics[2].value == 0))
  return (
    <div>
      <p>
        No feedback has been given.
      </p>
    </div>
  )

  return (
    <div>
      <StatisticLine text = "Good"    value = {props.statistics[0].value} />
      <StatisticLine text = "Neutral" value = {props.statistics[1].value} />
      <StatisticLine text = "Bad"     value = {props.statistics[2].value} />
      <StatisticLine text = "Total"   value = {props.statistics[0].value + props.statistics[1].value + props.statistics[2].value} />
      <StatisticLine text = "Average" value = {(props.statistics[0].value - props.statistics[2].value) / (props.statistics[0].value + props.statistics[1].value + props.statistics[2].value)} />
      <StatisticLine text = "Pos%"    value = {(props.statistics[0].value / (props.statistics[0].value + props.statistics[1].value + props.statistics[2].value))*100} />
    </div>
  )
}


const App = () => {
  const header = 'Give feedback'

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = {
    name: 'Statistics',
    statistics: [
      {
        name: 'Good',
        value: good
      },
      {
        name: 'Neutral',
        value: neutral
      },
      {
        name: 'Bad',
        value: bad
      }
    ]
  }

  const actionFeedbackGood = () => {
    console.log('good feedback')
    console.log(good)
    setGood(good +1)
  }

  const actionFeedbackNeutral = () => {
    console.log('neutral feedback')
    console.log(neutral)
    setNeutral(neutral +1)
  }

  const actionFeedbackBad = () => {
    console.log('bad feedback')
    console.log(bad)
    setBad(bad +1)
  }

  return ( 
  <div>
    <div>
      <Header header = {header} />
      <Button onClick={actionFeedbackGood} text='Good' />
      <Button onClick={actionFeedbackNeutral} text='Neutral' />
      <Button onClick={actionFeedbackBad} text='Bad' />
    </div>
    <div>
      <Header header = {statistics.name} />
      <Statistics statistics = {statistics.statistics} />
    </div>
  </div>
  )
}

export default App