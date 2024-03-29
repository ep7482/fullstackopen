// const mongoose = require('mongoose')
const Person = require('../models/person')
// mongoose.set('strictQuery', false)
// const url = process.env.MONGODB_URI

// console.log('connect to ', url)

// mongoose.connect(url)
    // .then(result=> {
    //     console.log('connected to MongoDB')
    // })
    // .catch((error) => {
    //     console.log('error connecting to MongoDB:', error.message)
    // })

    // const personSchema = new mongoose.Schema({
    //     name: String,
    //     number: String,
    // })

    // personSchema.set('toJSON', {
    //     transform: (document, returnedObject) => {
    //         returnedObject.id = returnedObject._id.toString()
    //         delete returnedObject._id
    //         delete returnedObject.__v
    //     }
    // })
    // const Person = mongoose.model('Person', personSchema)

const savePerson = (savePerson) => {
    const person = new Person({
        name: savePerson.name,
        number: savePerson.number,
    })

    // person.save().then(result => {
    //     console.log(`Added ${person.number} number ${person.name} to phonebook`)
    //     // mongoose.connection.close()
    // })
    return person.save()
        .then(savedPerson => {
            console.log(`Added ${person.number} number ${person.name} to phonebook`)
            return savedPerson
        })
        .catch(error => {
            throw error
        })
}

module.exports = savePerson