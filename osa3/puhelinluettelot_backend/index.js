
require('dotenv').config()
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
var morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person.js')
app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())
morgan.token('content',function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))




// person.save().then(result => {
//   console.log(`${person.name} saved!`)
//   mongoose.connection.close()
// })

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
    Person.find({}).then(persons => {
      response.json(persons)
})
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.get('/api/persons/:id', (request, response) => {
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

app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndDelete(request.params.id)    
  .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
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

  const person = new Person( {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000),
  })


  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
}
)
app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p> Phonebook has info of ${persons.length} people </p>
        <p>Date:${date.getDate()}.${date.getMonth()}.${date.getFullYear()} (DMY) Time:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT+0200(Eastern European standard time) </p>`
    )
})


//Error handling


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}


app.use(errorHandler)



const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
console.log(`Server running on port ${PORT}`)