const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))
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


app.get('/', (request, response) => {
    response.send('<h1>hello osa3</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<div>
        This phonebook has info for ${persons.length} people <br />
        ${Date()}
        </div>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id

    //Check if ID exists in persons
    if (persons.some(person => person.id === id)) {
        persons = persons.filter(person => person.id !== id)
        console.log(`Deleting person id ${id}`)
        console.log(persons)

        response.status(204).end()
    } else {
        console.log(`No person found with id ${id}`)
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing from your post request'
        })
    }

    if (persons.some(person => person.name === body.name)) {
        console.log('attempted to add non-unique person')
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: String(Math.floor(Math.random()*10000)),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)

    console.log('added new person')
    console.log(persons)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})