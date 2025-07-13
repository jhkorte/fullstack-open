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
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])
  const [indexOfMax, setIndexOfMax] = useState(0)

  const actionNextAnecdote = () => {
    console.log('next anecdote')
    console.log(selected)
    setSelected(Math.floor(Math.random() * 8))
    console.log(selected)
  } 

  const actionVoteAnecdote = () => {
    console.log('voted on anecdote number', selected)
    const votes_copy = [...votes]
    votes_copy[selected]++
    setVotes(votes_copy)
    console.log(votes)
    console.log(votes_copy)
  } 


  return (
    <div>
      <div>
        <Header header = "Random anecdote" />
        <p>
          {anecdotes[selected]}
        </p>
        <p>
          has {votes[selected]} votes
        </p>
        <p>
          <Button onClick={actionVoteAnecdote} text='Vote' />
          <Button onClick={actionNextAnecdote} text='Random anecdote' />
        </p>
      </div>
      <div>
        <Header header = "Most voted anecdote" />
        <p>
          {anecdotes[votes.indexOf(Math.max(...votes))]}
        </p>
        <p>
          has {votes[votes.indexOf(Math.max(...votes))]} votes
        </p>
      </div>
    </div>
  )
}

export default App