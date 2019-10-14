const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cors = require('cors')
const { messageIsNotValid, createNewToken } = require('./serverFns')
const { postMessage, getAllMessages, postCredentials, selectByUsername, getAllActiveUsers, addUserToActiveLobby } = require('../db/index')

const LOBBY = {}

app.use(cors())


io.on('connect', (socket) => {

  console.log('a user has connected')

  socket.on('authenticate user', token => {

    if (!token) {
      console.log('user does not have login token \n sending user to login')
      socket.emit('send user to login')
    }

    else {
      jwt.verify(JSON.parse(token), 'secrets', (err, decoded) => {

        if (err)  {
          console.log(err)
          socket.emit('send user to login')
        }

        else {
          console.log('user has valid token, logging in user')
          LOBBY[socket.id] = decoded.username
          socket.emit('user is valid', JSON.stringify(decoded))
        }
      })
    }
  })


  socket.on('verify username is unique', username => {

    selectByUsername(username, (err, response) => {
      if (err) console.log('err while checking for username in db, err:' + err)
      if (!response) socket.emit('username is available')
    })
  })


  socket.on('subscribe to messages', () => {

    console.log('a user is subscribing to messages')

    getAllMessages((err, response) => {

      if (err) return console.log(err)
      console.log('messages succefully retrieved from db \n sending to client')
      socket.emit('new messages', response)
    })
  })


  socket.on('subscribe to lobby', () => {

    console.log('a user is subscribing to lobby')
    socket.emit('lobby was updated', Object.values(LOBBY))
  })


  socket.on('new message', message => {

    console.log('posting new message')
    const parsedMessage = JSON.parse(message)

    if (messageIsNotValid(parsedMessage.message)) return socket.emit('invalid message')

    postMessage(parsedMessage, (err) => {

      if (err) return console.log('err while posting to db, err:', err)
      console.log('successfully saved messages to db')

      getAllMessages((err, response) => {

        if (err) return console.log(err)

        console.log('sending new messages to clients')
        socket.emit('new messages', response)
        socket.broadcast.emit('new messages', response)
      })
    })
  })


  socket.on('register new user', credentials => {

    console.log('registering in new user')
    let parsedCredentials = JSON.parse(credentials)

    bcrypt.hash(parsedCredentials.password, 10, (err, hash) => {

      if (err) return console.log('err while hashing credentials:' + err)
      parsedCredentials.password = hash

      postCredentials(parsedCredentials, (err) => {

        if (err) return console.log('err while posting credentials to db, err:' + err)

        console.log('successfully saved user credentials to db')

        socket.emit('login newly registered user', credentials)
      })
    })
  })


  socket.on('login existing user', credentials => {

    console.log('loggin in existing user')
    let parsedCredentials = JSON.parse(credentials)

    selectByUsername(parsedCredentials.username, (err, user) => {
      console.log('retrieved users credentials from db')

      if (err || !user) {
        console.log('invalid username or password')
        return socket.emit('invalid username or password')
      }

      bcrypt.compare(parsedCredentials.password, user.password, (err, res) => {
        console.log('comparing given password with hashed password')

        if (err || !res) {
          console.log('invalid username or password')
          return socket.emit('invalid username or password')
        }
        
        console.log('user is valid, creating new token for user')
        createNewToken(user, (err, newToken) => {
          if (err) return console.log(err)

          console.log('assigning new token')
          socket.emit('assign new token', newToken)
        })
      })
    })
  })


  socket.on('disconnect', () => {
    console.log('a user has disconnected')

    delete LOBBY[socket.id]
    socket.emit('lobby was updated', Object.values(LOBBY))
  })
})

const port = 3001
http.listen(port, () => console.log('...listening on port:' + port))