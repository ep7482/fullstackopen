// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(people => {
        setPersons(people)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name.toLowerCase())
    
    if (names.includes(newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook, replace the old number with new one?`)
      const id = names.indexOf(newName.toLowerCase()) + 1
      const personToChange = persons.find(p => p.id === id)
      const changedPerson = {...personToChange, number: newNumber}

      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
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
    }
    
    personService
      .create(nameObject)
      .then(nameObj => {
        setPersons(persons.concat(nameObj))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    const personToDelete = persons.filter(p => p.id === id)[0]
    if (confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .deleteObject(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(
            `the person '${personToDelete.name}' was already deleted from server`
          )
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handlePersonChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    // console.log(event.target.value)
    setFilterName(event.target.value)
  }

  var index, personsToShow
  console.log(persons)
  const names = persons.map(person => person.name.toLowerCase())


  if (names.includes(filterName.toLowerCase())) {
    index = names.indexOf(filterName.toLowerCase()) + 1
    personsToShow = persons.filter(person => person.id === index)
  } else {
    personsToShow = persons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filterName={filterName}
        handleFilterNameChange={handleFilterNameChange}/>
      <h2>add a new</h2>
      <PersonForm 
        addName={addName}
        newNumber={newNumber}
        newName={newName}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
