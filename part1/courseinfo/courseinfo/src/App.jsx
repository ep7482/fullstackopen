// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }


const Header = (props) => {
  console.log("Header props " + props)
  return (
    <h1>
      {props.course}
    </h1>
  )
}


const Part = (props) => {
  console.log("Part props: " + props)
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {
  console.log("Content props: " + props)
  return (
    <div>
      <Part part={props.part1} exercise={props.exercise1}/>
      <Part part={props.part2} exercise={props.exercise2}/>
      <Part part={props.part3} exercise={props.exercise3}/>
    </div>
  )
}

const Total = (props) => {
  console.log("Total props: " + props)
  return (
    <p>
      Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}
    </p>
  )
}

//Part 1.3
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
      <Header course={course}/>
      <Content part1={part1.name} part2={part2.name} part3={part3.name} exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises}/>       
      <Total exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises}/>
    </div>
  )
}

//Part 1.2
// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = 'Fundementals of React'
//   const exercise1 = 10
//   const part2 = 'Using props to pass data'
//   const exercise2 = 7
//   const part3 = 'State of a component'
//   const exercise3 = 14

//   return (
//     <div>
//       <Header course={course}/>
//       <Content part1={part1} part2={part2} part3={part3} exercise1={exercise1} exercise2={exercise2} exercise3={exercise3}/>
//       <Total exercise1={exercise1} exercise2={exercise2} exercise3={exercise3}/>
//     </div>
//   )
// }

export default App
