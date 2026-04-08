


const Course = (props) => {
  const title = props.course.name;
  const courseParts = props.course.parts;
  const totalExercises = courseParts.reduce((sum,part) => sum + part.exercises,0)
  const PrintParts = () => {
  return (
    courseParts.map((part) =>(
      <p key = {part.id}> {part.name} {part.exercises} </p>
    )
  )
       
  )
}

  return(
    <>
    <h1>{title}</h1>
    <PrintParts />
    <p> total of {totalExercises} exercises</p>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
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
