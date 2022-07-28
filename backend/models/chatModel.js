const {Schema, model, Types} = require('../connection');

const schemaObject =  new Schema({
    chatData: Object,
    createdAt: Date,
    userId: Types.ObjectId
})

module.exports = model('chat', schemaObject);