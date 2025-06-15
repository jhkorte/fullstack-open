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
      <Part partname={props.partname1} ex={props.ex1} />
      <Part partname={props.partname2} ex={props.ex2} />
      <Part partname={props.partname3} ex={props.ex3} />
    </div>
  )
}


const Part = (props) => {
  return (
    <div>
      <p>
        {props.partname} {props.ex}
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

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content partname1={part1.name} ex1={part1.exercises} 
               partname2={part2.name} ex2={part2.exercises}
               partname3={part3.name} ex3={part3.exercises}
      />
      <Total a={part1.exercises} b={part2.exercises} c={part3.exercises}/>
    </div>
  )
}



export default App