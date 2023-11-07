

const Header = (props) => {
    return (
      <h2>
        {props.course.name}
      </h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercise}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part =>
          <Part key={part.id} name={part.name} exercise={part.exercises}/>
        )}
      </div>
    )
  }

  const Total = (props) => {
    const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <p>
        <b>Number of exercises {total}</b>
      </p>
    )
  }
  
  const Course = (props) => {
    return (
      <div>
        <Header course={props.course}/>
        <Content parts={props.course.parts}/>
        <Total parts={props.course.parts}/>
      </div>
    )
  }
  

  export default Course