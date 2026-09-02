import { useState } from 'react'
import axios from 'axios'

const PersonsForm = ({AddPerson, newName, handleNameChange,newNumber, handleNumberChange}) => {
  return(
  <>
    <h2>add a new</h2>
    <form onSubmit={AddPerson}>
      <div>
        name: <input value = {newName}
        onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value = {newNumber}
        onChange = {handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
  )
}

const FilterForm = ({searchValue,updateSearchValue}) => {
  return(
      <form>
    filter shown with <input value={searchValue}
    onChange={updateSearchValue}/>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '044 6789523',
      id: 1
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

    const personsToShow = 
    searchValue === ""
    ? persons
    : persons.filter(person => person.name.includes(searchValue))

  const AddPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    const duplicate = persons.find((person)=>person.name === newName)
    if (duplicate) {
      console.log("duplicate name found")
      alert(newName + " is already added to phonebook")
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length +1
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }
  }

  const handleNameChange = (event) =>{
    console.log("name: " + event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    console.log("number: " + event.target.value)
    setNewNumber(event.target.value)
  }
  const updateSearchValue = (event) => {
    console.log("search value: " + event.target.value)
    setSearchValue(event.target.value)
  }

  const NumbersList = () => {
    return (
      <>
        <h2>Numbers</h2>
        <ul>
          {personsToShow.map(person =>
          <p key={person.id}> {person.name} {person.number}</p>

          ) }
        </ul>
      </>
    )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm 
      searchValue={searchValue}
      updateSearchValue= {updateSearchValue}/>
      <PersonsForm 
      AddPerson={AddPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}/>
      <NumbersList/>

    </div>
  )

}

export default App