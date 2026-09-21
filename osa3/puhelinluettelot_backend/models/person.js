const mongoose = require('mongoose')
const db_uri = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(db_uri, { family: 4 })




const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name cant be empty']
  },
  number:{
    type: String,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-(?=(\d+)\d$)/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    minLength: [8,'Number should be minimum of 8 digits'],
    required: [true, 'Number cant be empty']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})





module.exports = mongoose.model('Person', personSchema)