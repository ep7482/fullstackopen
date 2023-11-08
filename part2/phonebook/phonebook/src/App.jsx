// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id:1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (newName === 'Arto Hellas') {
      alert('Arto Hellas is already added to phonebook')
      return
    } else if (names.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    if (newNumber === '' && newName === '') {
      alert('Please enter name and number')
      return
    } else if (newName === '') {
      alert('Please enter name')
      return
    } else if (newNumber === '') {
      alert('Please enter number')
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
    // console.log('button clicked', event.target)
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  var index
  var personsToShow
  const names = persons.map(person => person.name.toLowerCase())
  if (names.includes(filterName.toLowerCase())) {
    index = names.indexOf(filterName.toLowerCase()) + 1
    personsToShow = persons.filter(person => person.id === index)
    // console.log(index, persons.filter(person => person.id === index))
  } else {
    personsToShow = persons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange}/>
      <h2>add a new</h2>
      <PersonForm 
          addName={addName}
          newNumber={newNumber}
          newName={newName}
          handleNumberChange={handleNumberChange}
          handlePersonChange={handlePersonChange}
        />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
