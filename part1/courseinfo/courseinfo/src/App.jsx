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

// const Hello = ({name, age}) => {
//   const bornYear = () => new Date().getFullYear() - age

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26+10}/>
//       <Hello name={name} age={age}/>
//     </div>
//   )
// }

import { useState } from "react"

const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={setToValue(1000)} text="thousand"/>
      <Button handleClick={setToValue(0)} text="reset"/>
      <Button handleClick={setToValue(value + 1)} text="increment"/>
    </div>
  )
}

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ handleClick, text}) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])
//   const [total, setTotal] = useState(0)


//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     const updatedLeft = left + 1
//     setLeft(updatedLeft)
//     setTotal(updatedLeft + right)
//   }


//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     const updatedRight = right + 1
//     setRight(updatedRight)
//     setTotal(left + updatedRight)
//   }



//   return (
//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text='left'/>
//       <Button handleClick={handleRightClick} text='right'/>
//       {right}
//       <History allClicks={allClicks}/>
//       <p>total {total}</p>
//     </div>
//   )
// }

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })

//   const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})
//   const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})

//   return (
//     <div>
//       {clicks.left}
//       <button onClick={handleLeftClick}>left</button>
//       <button onClick={handleRightClick}>right</button>
//       {clicks.right}
//     </div>
//   )
// }


// const Display = ({counter}) => <div>{counter}</div>
// const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

// const App = () => {
//   const [ counter, setCounter ] = useState(0)
//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => {
//     console.log('increasing, value before', counter)
//     setCounter(counter + 1)
//   }
//   const decreaseByOne = () => {
//     console.log('decreasing, value before', counter)
//     setCounter(counter - 1)
//   }
//   const setToZero = () => {
//     console.log('resetting to zero, value before', counter)
//     setCounter(0)
//   }

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button handleClick={increaseByOne} text="Plus"/>
//       <Button handleClick={decreaseByOne} text="Minus"/>
//       <Button handleClick={setToZero} text="Zero"/>
//     </div>
//   )
// }

// const Header = (props) => {
//   console.log("Header props " + props)
//   return (
//     <h1>
//       {props.course}
//     </h1>
//   )
// }


// const Part = (props) => {
//   console.log("Part props: " + props)
//   return (
//     <p>
//       {props.part} {props.exercise}
//     </p>
//   )
// }

// const Content = (props) => {
//   console.log("Content props: " + props)
//   return (
//     <div>
//       <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
//       <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
//       <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
//     </div>
//   )
// }

// const Total = (props) => {
//   console.log("Total props: " + props)
//   return (
//     <p>
//       Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
//     </p>
//   )
// }

//1.5
// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header course={course.name}/>
//       <Content parts={course.parts}/>       
//       <Total parts={course.parts}/>
//     </div>
//   )
// }

//1.4
// const App = () => {
//   const course = 'Half Stack application development'
//   const parts = [
//     {
//       name: 'Fundamentals of React',
//       exercises: 10
//     },
//     {
//       name: 'Using props to pass data',
//       exercises: 7
//     },
//     {
//       name: 'State of a component',
//       exercises: 14
//     }
//   ]

//   return (
//     <div>
//       <Header course={course}/>
//       <Content parts={parts}/>       
//       <Total parts={parts}/>
//     </div>
//   )
// }

//Part 1.3
// const App = () => {
//   const course = 'Half Stack application development'
//   const part1 = {
//     name: 'Fundamentals of React',
//     exercises: 10
//   }
//   const part2 = {
//     name: 'Using props to pass data',
//     exercises: 7
//   }
//   const part3 = {
//     name: 'State of a component',
//     exercises: 14
//   }

//   return (
//     <div>
//       <Header course={course}/>
//       <Content part1={part1.name} part2={part2.name} part3={part3.name} exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises}/>       
//       <Total exercise1={part1.exercises} exercise2={part2.exercises} exercise3={part3.exercises}/>
//     </div>
//   )
// }

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
