const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cors = require('cors')
const { messageIsNotValid } = require('./serverFns')
const { postMessage, getAllMessages, postCredentials, selectByUsername } = require('../db/index')

app.use(cors())

io.on('connect', (socket) => {
  console.log('a user has connected')

  socket.on('authenticateUser', token => {
    if (!token) socket.emit('sendUserToLogin')
    else {
      jwt.verify(JSON.parse(token), 'secrets', (err, decoded) => {
        if (err)  {
          console.log(err)
          socket.emit('sendUserToLogin')
        }
        else socket.emit('userIsValid', JSON.stringify(decoded))
      })
    }
  })

  socket.on('verify username is unique', username => {
    selectByUsername(username, (err, response) => {
      if (err) console.log('err while checking for username in db, err:' + err)

      if (!response) socket.emit('username is available')
    })
  })

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

  socket.on('login new user', credentials => {
    console.log('logging in new user')
    let parsedCredentials = JSON.parse(credentials)

    bcrypt.hash(parsedCredentials.password, 10, (err, hash) => {
      if (err) return console.log(err)
      parsedCredentials.password = hash

      postCredentials(parsedCredentials, (err, response) => {
        if (err) return console.log('err while posting credentials to db, err:' + err)

        console.log('successfully saved user credentials to db')
        
        selectByUsername(parsedCredentials.username, (err, user) => {
          console.log(user)
          const userStr = JSON.stringify({
            username: user.username, 
            id: user.id
          })

          jwt.sign(userStr, 'secrets', (err, token) => {
            if (err) return console.log(err)
  
            socket.emit('assigned new token', JSON.stringify(token))
          })
        })
      })
    })
  })

  socket.on('login existing user', credentials => {
    let parsedCredentials = JSON.parse(credentials)

    const user = selectByUsername(parsedCredentials.username, (err, user) => {
      if (err) console.log(err)
      //write login authentication here
    })
  })

  socket.on('disconnect', () => console.log('a user has disconnected'))
})

const port = 3001
http.listen(port, () => console.log('...listening on port:' + port))