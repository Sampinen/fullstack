
require('dotenv').config()
const express = require('express')
const app = express()

var morgan = require('morgan')

const cors = require('cors')
const Person = require('./models/person.js')
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
morgan.token('content',function getBody (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => {
      console.log(error.name)
      response.status(500).end()
    })
})

app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).send({ error: 'unknown endpoint' }).end()
      }    
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response,next) => {
  Person.findByIdAndDelete(request.params.id)    
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(async person => {
      if (!person) {
        response.status(404).send({ error: 'unknown endpoint' }).end()
      }
      else if (person.name != name) {
        response.status(400).send({ error: 'Name and id do not match' }).end()
      }
      else {

        person.name = name
        person.number = number

        const updatedPerson = await person.save()
        response.json(updatedPerson)
      }
    })
    .catch(error => next(error))
})



app.post('/api/persons', (request, response,next) => {
  const body = request.body
  if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  if (!body.name) {
    return response.status(400).json({ 
      error: 'Name is missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'Number is missing' 
    })
  }
  const person = new Person( {
    name: body.name,
    number: body.number
  })
  Person.exists({name: body.name}).then(nameExists => {
    if (nameExists) {
      return response.status(400).json({ 
        error: 'Name already exists' 
      })
    } else {

      person.save().then(savedPerson => {
        response.json(savedPerson)
      }).catch(error => next(error))
    }
  })

})



app.get('/info', (request, response,next) => {
  const date = new Date()
  Person.find({}).then(persons => 
    response.send(
      `<p> Phonebook has info of ${persons.length} people </p>
          <p>Date:${date.getDate()}.${date.getMonth()}.${date.getFullYear()} (DMY) Time:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT+0200(Eastern European standard time) </p>`
    )
  )
    .catch(error => next(error))
})
    
//Error handling

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })  
  }
  console.log(error.name)
  next(error)
}


app.use(errorHandler)




const PORT = process.env.PORT || 10000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})