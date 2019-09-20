import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

function subscribeToMessages(cb) {
  socket.on('new messages', messages => cb(messages))

  socket.on('invalid message', () => alert('message contains 1 or more invalid characters'))

  socket.emit('subscribeToMessages')
}

function postMessage(data) {
  socket.emit('new message', data)
}

function postLogin(data) {
  socket.emit('new login', data)
}

export { subscribeToMessages, postMessage, postLogin }