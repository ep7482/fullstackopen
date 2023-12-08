const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://epalma7482:${password}@cluster0.sh7mhbj.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!personName && !personNumber) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: personName,
        number: personNumber,
    })

    person.save().then(result => {
        console.log(`Added ${personName} number ${personNumber} to phonebook`, result)
        mongoose.connection.close()
    })
}
