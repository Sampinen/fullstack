
const Header = (props) => {
  return(
  <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return(
      <div>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
      </div>
  )

}

const Part = (props) => {
  return(
      <p>
        {props.part} {props.exercises}
      </p>
  )

}

const Total = (props) => {
  return(
    <p>
      Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}
    </p>
  )
}

const Course = (props) => {
  const title = props.course.name
  const courseParts = props.course.parts
  const PrintParts = () => {
  return (
    courseParts.map((part, id) =>(
      <p key = {id}> {part.name} {part.exercises} </p>
    )
  )
       
  )
}

  return(
    <>
    <h1>{title}</h1>
    <PrintParts />
    </>
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
        name:'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
