const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const cors = require('cors')
const bodyParser = require('body-parser')
const { messageIsNotValid } = require('./serverFns')

const { data } = require('./example')

app.use(cors())

io.on('connect', (socket) => {
  console.log('a user has connected')

  socket.on('subscribeToMessages', () => {
    console.log('a user is subscribing to messages')
    socket.emit('new messages', data)
  })

  socket.on('new message', message => {
    console.log('posting message: ' + message)
    data.push(JSON.parse(message))
    socket.emit('new messages', data)
  })

  socket.on('disconnect', () => console.log('a user has disconnected'))
})

http.listen(3001, () => console.log('listening on *:3000'))