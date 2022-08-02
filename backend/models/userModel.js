const { Schema, model, Types } = require("../connection")

const schemaObject = new Schema({
  name: String,
  mobile: String,
  dob: Date,
  age: Number,
  email: String,
  contact: String,
  contacts: [{ type: Types.ObjectId, ref: "users" }],
  password: String,
})

module.exports = model("users", schemaObject)
