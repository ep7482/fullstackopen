// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

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
      // const id = names.indexOf(newName.toLowerCase()) + 1
      const id = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase())[0].id
      const personToChange = persons.find(p => p.id === id)
      const changedPerson = {...personToChange, number: newNumber}

      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageType("addPerson")
          setNotificationMessage(
            `Changed ${returnedPerson.name}'s number to ${returnedPerson.number}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch((error) => {
          setMessageType("error")
          setNotificationMessage(
            `Information of ${changedPerson.name} has already been removed from server`
          )
          setPersons(persons.filter(p => p.id !== id))
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
        setMessageType("addPerson")
        setNotificationMessage(
          `Added ${nameObj.name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessageType("error")
        setNotificationMessage(
          error.response.data.error
        )
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
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  var index, personsToShow
  // console.log(persons)
  const names = persons.map(person => person.name.toLowerCase())
  const ids = persons.map(person => person.id)

  if (names.includes(filterName.toLowerCase())) {
    index = names.indexOf(filterName.toLowerCase())
    personsToShow = persons.filter(person => person.id === ids[index])
  } else {
    personsToShow = persons
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={messageType}/>
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
