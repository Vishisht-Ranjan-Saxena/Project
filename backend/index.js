const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

//initializing express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors : { origin : ['http://localhost:3000'] } });

io.on("connection", (socket) => {
  console.log("a client connected");

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

//   receiving an event from client
    socket.on('sendmsg', ( data ) => {
        console.log(data);
    });

});

const port = 5000;

const userRouter = require('./routers/userRouter');
// const productRouter = require('./routers/productRouter');
const cors = require('cors');
const { log } = require('console');

// middleware

// to parse json data into javascript object
app.use(express.json());

// for allowing frontend to access backend
app.use( cors({ origin : ['http://localhost:3000'] }) );

// app.use('/product', productRouter);
app.use('/user', userRouter);

app.get('/add', (req, res) => {
    res.send('Response from Express!');
});

app.get('/home', (req, res) => {
    res.send('Response from Express Home!');
});

// starting the server
// httpServer.listen(port, () => console.log('server started'));
httpServer.listen(port, () => console.log('server started'));