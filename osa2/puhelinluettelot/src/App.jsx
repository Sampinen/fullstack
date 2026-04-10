import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1
     }
  ]) 
  const [newName, setNewName] = useState('')

  const AddPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    const personObject = {
      name: newName,
      id: persons.length +1
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')

  }

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddPerson}>
        <div>
          name: <input value = {newName}
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
        <p key={person.id}> {person.name}</p>

        ) }
      </ul>

    </div>
  )

}

export default App