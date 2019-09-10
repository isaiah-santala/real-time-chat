import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

function subscribeToMessages(cb) {
  socket.on('new messages', messages => cb(messages))
  socket.emit('subscribeToMessages')
}

function postMessage(data) {
  socket.emit('new message', data)
}

export { subscribeToMessages, postMessage }