const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const { messageIsNotValid } = require('./serverFns')

const { data } = require('./example')
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())

app.get('/messages', (req, res) => {
  res.status(200).send(data)
})

app.post('/messages/create', (req, res) => {
  if (messageIsNotValid(req.body.message)) return res.status(422).send()

  data.push(req.body)
  res.status(201).send()
})

app.listen(PORT, () => console.log('...listening on port:' + PORT))

// var express = require('express');
// var app = express();

// // app.use/routes/etc...

// var server = app.listen(3033);
// var io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
//   ...
// });