require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))

/*
let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
]
*/

app.get('/', (request, response) => {
    response.send('<h1>hello osa3</h1>')
})

app.get('/api/persons', (request, response) => {
    //response.json(persons)
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(
            `<div>
            This phonebook has info for ${persons.length} people <br />
            ${Date()}
            </div>`
        )
    })
    
})

app.get('/api/persons/:id', (request, response, next) => {
    /*
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    */

    /*
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
    */

    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    /*
    Person.find({}).then(persons => {
        console.log('Before deleting:')
        persons.forEach(person => console.log(person))
    })
    */

    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            Person.find({}).then(updatedPersons => {
                console.log(`After deleting ${request.params.id} `, updatedPersons)
            })
            
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing from your post request'
        })
    }

    /*  Re-written below to work with mongodb. This code is for the hard-coded "database". 
        Leaving this here for now, for reference.

    if (persons.some(person => person.name === body.name)) {
        console.log('attempted to add non-unique person')
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    */

    Person.findOne( { name: body.name }).then(existingPerson => {
        if (existingPerson) {
            console.log('attempted to add non-unique person')
            return response.status(400).json({
                error: 'name must be unique'
            })
        }

        const person = new Person({
           name: body.name,
           number: body.number,
        })


        person.save().then(savedPerson => {
            response.json(savedPerson)
            console.log('added new person', savedPerson)
            Person.find({}).then(persons => {
                console.log('After adding new person:')
                persons.forEach(person => console.log(person))
            })
        })
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.name = name
            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})


// ---------------------- No routes beyond this line ----------------------


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

// This must be called only after all other middlewares
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})