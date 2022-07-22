const mongoose = require('mongoose');
const dbName = "mytestdb";
const dbUrl = `mongodb+srv://vishisht:famous123@cluster0.r36zc.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// asynchrounous function
// this function will return a promise

// const res = await mongoose.connect(dbUrl);

mongoose.connect(dbUrl)
.then((result) => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error(err);
});

module.exports = mongoose;