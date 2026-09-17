


const mongoose = require('mongoose')
require('dotenv').config()
const db_uri = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(db_uri, { family: 4 })




    const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    })



const Person = mongoose.model('Person', personSchema)


const person = new Person({
  name: name,
  number: number,
})


person.save().then(result => {
  console.log(`${person.name} saved!`)
  mongoose.connection.close()
})
}



    Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})

// }

// export default { 
//   getAll: getAll, 
//   create: create, 
//   delObject: delObject,
//   update: update

// }