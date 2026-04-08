


const Course = (props) => {
  console.log(props)
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

const Courses = (props) => {
  const courses = props.courses
  console.log(courses)
  return (
    props.courses.map((course) => (
          <Course course={course}/>
      )
      )
  )
}




const App = () => {  
  const course = [
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
      <Courses courses = {course} />
    </div>
  )
}

export default App
