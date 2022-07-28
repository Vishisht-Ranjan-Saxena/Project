const {Schema, model} = require('../connection');

const schemaObject =  new Schema({
    name : String,
    mobile : String,
    dob: Date,
    age : Number,
    email : String,
    password : String,
})

module.exports = model('users', schemaObject);