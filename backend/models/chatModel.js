const { Schema, model, Types } = require("../connection");

const schemaObject =  new Schema({
    chatData: Object,
    user: { type: Types.ObjectId, ref: "users" },
    rec: { type: Types.ObjectId, ref: "users" },
    createdAt: Date,
})

// module.exports = model('chat', schema);
module.exports = model('chat', schemaObject);
