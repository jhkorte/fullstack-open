const Header = (props) => {
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}


const Content = (props) => {
  console.log('rendering content, with props', props)
  return (
    <div>      
      {/*
      <Part partname = {props.parts[0].name} ex = {props.parts[0].exercises} />
      <Part partname = {props.parts[1].name} ex = {props.parts[1].exercises} />
      <Part partname = {props.parts[2].name} ex = {props.parts[2].exercises} />
      code block above is rewritten more neatly below.
      */}
      {props.parts.map(part => 
        <Part key={part.id} partname={part.name} ex={part.exercises} />
      )}
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
  console.log('counting total, with props', props)
  return (
    <div>
      <p>
        <b>
          {/*
          Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
          code block above is rewritten more neatly below.
          */}
          Number of exercises {props.parts.reduce((sum, part) => sum+part.exercises,0)}
        </b>
      </p>
    </div>
  )
}


const Course = (props) => {
  return (
    <div>
      <div>
        <Header header = {props.course.name} />
      </div>
      <div>
        <Content parts = {props.course.parts} />
      </div>
      <div>
        <Total parts = {props.course.parts} />
      </div>
    </div>
  )
}


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 

    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course course = {courses[0]} />
      <Course course = {courses[1]} />
    </div>
  )
}


export default App