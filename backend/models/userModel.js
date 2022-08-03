const {Schema, model, Types} = require('../connection');

const schemaObject =  new Schema({
    name : String,
    mobile : String,
    contacts: [{ type: Types.ObjectId, ref: "users" }],
    dob: Date,
    age : Number,
    email : String,
    password : String,
})

module.exports = model("users", schemaObject)
