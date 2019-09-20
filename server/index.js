const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bcrypt = require('bcrypt')

const cors = require('cors')
const { messageIsNotValid } = require('./serverFns')
const { postMessage, getAllMessages, postCredentials } = require('../db/index')

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
      if (err) return console.log('err while posting to db, err:', err)
      console.log('successfully saved messages to db')

      getAllMessages((err, response) => {
        if (err) return console.log(err)
        socket.emit('new messages', response.rows)
        socket.broadcast.emit('new messages', response.rows)
      })
    })
  })

  socket.on('new login', credentials => {
    console.log('logging in new user')
    let parsedCredentials = JSON.parse(credentials)

    bcrypt.hash(parsedCredentials.password, 10, (err, hash) => {
      if (err) return console.log(err)
      parsedCredentials.password = hash

      postCredentials(parsedCredentials, (err, response) => {
        if (err) return console.log('err while posting credentials to db, err:' + err)
        console.log('successfully saved user credentials to db')
      })
    })
  })

  socket.on('disconnect', () => console.log('a user has disconnected'))
})

const port = 3001
http.listen(port, () => console.log('...listening on port:' + port))