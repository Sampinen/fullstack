

const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
morgan.token('content',function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [

{ 
    "name": "Arto Hellas", 
    "number": "040-123456",
    "id": "1"
},
{ 
    "name": "Ada Lovelace", 
    "number": "39-44-5323523",
    "id": "2"
},
{ 
    "name": "Dan Abramov", 
    "number": "12-43-234345",
    "id": "3"
},
{ 
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122",
    "id": "4"
}

]



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
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
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body) {
    return response.status(400).json({ 
      error: `content missing` 
    })
  }
  if (!body.name) {
    return response.status(400).json({ 
      error: `Name is missing` 
    })
  }
    if (!body.number) {
    return response.status(400).json({ 
      error: `Number is missing` 
    })
    }
    const nameExists = persons.find(person => person.name ===body.name)
    if (nameExists) {
    return response.status(400).json({ 
      error: `Name already exists` 
    })
    }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000),
  }


  persons = persons.concat(person)

  response.json(person)
}
)
app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p> Phonebook has info of ${persons.length} people </p>
        <p>Date:${date.getDate()}.${date.getMonth()}.${date.getFullYear()} (DMY) Time:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT+0200(Eastern European standard time) </p>`
    )
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on port ${PORT}`)