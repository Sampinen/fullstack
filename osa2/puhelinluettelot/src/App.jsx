import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Notification from './components/Notification'


const PersonsForm = ({AddPerson, newName, handleNameChange,newNumber, handleNumberChange}) => {
  return(
  <>
    <h2>add a new</h2>
    <form id = "pform"
    onSubmit={AddPerson}>
      <div>
        name: <input 
        id ="nameinput" 
        value = {newName}
        onChange={handleNameChange}/>
      </div>
      <div>
        number: <input 
        id ="numberinput"
        value = {newNumber}
        onChange = {handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
  )
}

  const NumbersList = ({personsToShow,persons,setPersons,setAlertMessage,setAlertType}) => {
    const delPerson = (index,name)=>{
              if (window.confirm(`Are you sure you want to delete ${name}?`)) {
              personsService.delObject(index)
                          .then( () => {
                                console.log('person deleted'),
                                setPersons(persons.filter(person => person.id !== index))
                                        }
                                        
                                )
                                  setAlertMessage(`${name} deleted succesfully`)
                                  setAlertType("success")
                                  setTimeout(() => {
                                    setAlertMessage(null)
                                    setAlertType(null)
                                  }, 5000)
                              }
                              else {
                                console.log('Deletion canceled')
                                  setAlertMessage(`${name}, deletion cancelled`)
                                  setAlertType("notify")
                                  setTimeout(() => {
                                    setAlertMessage(null)
                                    setAlertType(null)
                                  }, 5000)
                          
                              }
      }
    return (
      <>
        <h2>Numbers</h2>
        <ul>
          {personsToShow.map(person =>
          <p key={person.id}> 
            {person.name} 
            {person.number}
            <button onClick={() =>delPerson(person.id, person.name)}>
              delete
            </button>
          </p>
          ) }
        </ul>
      </>
    )
  }

const FilterForm = ({searchValue,updateSearchValue}) => {
  return(
      <form>
    filter shown with <input 
    id ="searchinput"
    value={searchValue}
    onChange={updateSearchValue}/>
    </form>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Erkki Esimerkki',
      number: '404',
      id: 1
     }
  ]) 
  const [alertMessage, setAlertMessage] = useState(null)
  const [alertType,setAlertType] = useState('notify')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchValue, setSearchValue] = useState('')

    const personsToShow = 
    searchValue === ""
    ? persons
    : persons.filter(person => person.name.includes(searchValue))

  useEffect(() => {
    console.log('effect')
    personsService.getAll().then(
      (response) => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }
    )
  }, [])

  console.log('render', persons.length, 'notes')

  const AddPerson = (event) => {
    event.preventDefault()
    console.log(event.target)
    const duplicate = persons.find((person)=>person.name === newName)
    if (duplicate) {
      duplicate.number = newNumber
      if (window.confirm(`${duplicate.name} is already added to phonebook. Do you want to replace the old number with a new one?`)) {
        console.log(duplicate)
        personsService.update(duplicate.id,duplicate)
        .then( (response) => {
          setPersons(persons.map(person => person.name !==  newName? person : response.data))
          setAlertMessage(`${duplicate.name}: number changed`)
        setAlertType("success")
        setTimeout(() => {
          setAlertMessage(null)
          setAlertType(null)
        }, 5000)
        } )
        .catch( () => {
          setAlertMessage(`${duplicate.name} was already deleted`)
          setAlertType("error")
          setPersons(persons.filter(n => n.name !== duplicate.name))
        setTimeout(() => {
          setAlertMessage(null)
          setAlertType(null)
        }, 5000)
      }
        )
      }
      else {
        setAlertMessage(`${name}: Number change cancelled`)
        setAlertType("notify")
        setTimeout(() => {
          setAlertMessage(null)
          setAlertType(null)
        }, 5000)
      }
    setNewName('')
    setNewNumber('')
    }
    else {
    const personObject = {
      name: newName,
      number: newNumber
    }
    personsService.create(personObject).then(
      response => {
    console.log(response)
    console.log(response.data)
    setPersons(persons.concat(response.data))
    setNewName('')
    setNewNumber('')
    })
  
        setAlertMessage(`${personObject.name} added to phonebook`)
        setAlertType("success")
        setTimeout(() => {
          setAlertMessage(null)
          setAlertType(null)
        }, 5000)
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


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMessage} className={alertType}/>
      <FilterForm 
      searchValue={searchValue}
      updateSearchValue= {updateSearchValue}/>
      <PersonsForm 
      AddPerson={AddPerson}
      newName={newName}
      handleNameChange={handleNameChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}/>
      <NumbersList personsToShow={personsToShow} persons={persons} setPersons={setPersons} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />

    </div>
  )

}

export default App