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

// export default App

import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Votes = (props) => (
  <div>
    has {props.vote_count} votes
  </div>
)

const Most = (props) => {
  const maxx = Math.max(...props.votes)
  const maxx_index = props.votes.indexOf(maxx)
  if (maxx === 0) {
    return (
      <p>More Data Needed</p>
    )
  }
  return (
    <div>
      <div>
        {props.anecdotes[maxx_index]}
      </div>
      has {props.votes[maxx_index]} votes
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const anc_len = anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anc_len))

  const handle_rand_num = () => {
    let rand = Math.floor(Math.random() * anc_len)
    console.log(rand)
    return setSelected(rand)
  } 

  const handle_votes = () => {
    const votes_copy = [...votes]
    votes_copy[selected] += 1
    return setVotes(votes_copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Votes vote_count={votes[selected]}/>
      <Button handleClick={handle_votes} text='Vote'/>
      <Button handleClick={handle_rand_num} text='Next Anecdote'/>
      <h1>Anecdote of most votes</h1>
      <Most anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App