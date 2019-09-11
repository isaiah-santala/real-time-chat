const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const cors = require('cors')
const { messageIsNotValid } = require('./serverFns')
const { postMessage, getAllMessages } = require('../db/index')

const data = []

app.use(cors())

io.on('connect', (socket) => {
  console.log('a user has connected')

  socket.on('subscribeToMessages', () => {
    console.log('a user is subscribing to messages')
    getAllMessages((err, response) => {
      if (err) return console.log(err)
      socket.emit('new messages', response.rows)
      console.log('messages succefully retrieved from db')
    })
  })

  socket.on('new message', message => {
    console.log('posting message: ' + message)
    const parsedMessage = JSON.parse(message)
    console.log(parsedMessage)
    if (messageIsNotValid(parsedMessage.message)) return socket.emit('invalid message')

    postMessage(parsedMessage, (err, response) => {
      if (err) return console.log(err)
      console.log('successfully saved messages to database')

      getAllMessages((err, response) => {
        if (err) return console.log(err)
        socket.emit('new messages', response.rows)
        socket.broadcast.emit('new messages', response.rows)
      })
    })
    // data.push(parsedMessage)
    // socket.emit('new messages', data)
    // socket.broadcast.emit('new messages', data)
  })

  socket.on('disconnect', () => console.log('a user has disconnected'))
})

http.listen(3001, () => console.log('listening on *:3000'))