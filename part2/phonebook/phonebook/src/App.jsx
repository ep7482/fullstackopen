// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  console.log('render', persons.length, 'persons')

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
    console.log('button clicked', event.target)
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
