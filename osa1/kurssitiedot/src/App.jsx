const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.ex}
      </p>
    </div>
  )
}


const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.a+props.b+props.c}
      </p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part={part1} ex={exercises1} />
      <Content part={part2} ex={exercises2} />
      <Content part={part3} ex={exercises3} />
      <Total a={exercises1} b={exercises2} c={exercises3}/>
    </div>
  )
}



export default App