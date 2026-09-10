const http = require('http')
const express = require('express')
const app = express()
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
  const isperson = (person ? person : "No person with such id")
  response.json(isperson)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(
        `<p> Phonebook has info of ${persons.length} people </p>
        <p>Date:${date.getDate()}.${date.getMonth()}.${date.getFullYear()} (DMY) Time:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT+0200(Eastern European standard time) </p>`
    )
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)