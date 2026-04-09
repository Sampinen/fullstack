const Course = (props) => {
  const courses = props.courses
  console.log(courses)
  return (
    props.courses.map((course) => (
          <SingleCourse course={course}/>
      )
      )
  )
}



const SingleCourse = (props) => {
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
    <h3> total of {totalExercises} exercises</h3>
    </>
  )
}

export default Course