const mongoose = require('mongoose')
const db_uri = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(db_uri, { family: 4 })




const personSchema = new mongoose.Schema({
name: String,
number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



const Person = mongoose.model('Person', personSchema)





module.exports = mongoose.model('Person', personSchema)