import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('adding anecdote')
    const content = event.target.anecdote.value
    event.target.anecdote.value = '' //asetetaan formin täyttöalueen arvo tyhjäksi
    console.log(content)
    dispatch(createAnecdote(content))
  }
  
  return (
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create new anecdote</button>
      </form>
  )
}

export default AnecdoteForm