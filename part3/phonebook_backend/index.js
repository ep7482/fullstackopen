require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
const Person = require('./models/person') 
const savePerson = require('./mongoose_modules/save')


// const requestLogger = (request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next()
// }

morgan.token('body', (request) => JSON.stringify(request.body))

app.use(express.json())
app.use(express.static('dist'))
// app.use(requestLogger)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World! Test</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/info', (request, response) => {
    Person.countDocuments({})
        .then(count => {
            response.send(`
                <p>Phonebook has info for ${count} people</p>
                ${Date()}
            `)
        })
        .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    return Math.floor(Math.random() * 10000)
}

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    Person.findByIdAndUpdate(request.params.id, {$set: {'number':body.number}}, {new: true, runValidators: true, context: 'query'})
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    const nameExist = persons.find(person => person.name === body.name)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number is missing'
        })
    } else if (nameExist) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    savePerson(person)
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
//handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }

    next(error)
}
//handler of requests with result to errors
app.use(errorHandler) 


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})