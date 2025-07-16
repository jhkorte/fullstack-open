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
  // console.log(props)
  return (
    <div>
      <Part partname = {props.parts[0].name} ex = {props.parts[0].exercises} />
      <Part partname = {props.parts[1].name} ex = {props.parts[1].exercises} />
      <Part partname = {props.parts[2].name} ex = {props.parts[2].exercises} />
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
        Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
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
    </div>
  )
}


const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course course = {course} />
    </div>
  )
}


export default App