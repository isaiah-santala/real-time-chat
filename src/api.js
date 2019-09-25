import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

function subscribeToMessages(cb) {

  socket.on('new messages', messages => cb(messages))

  socket.on('invalid message', () => alert('message contains 1 or more invalid characters'))

  socket.emit('subscribeToMessages')
}

function postMessage(data) {
  socket.emit('new message', JSON.stringify(data))
}

// function loginExistingUser(data) {
//   socket.emit('login existing user', JSON.stringify(data))

//   socket.on('assign new token', token => {
//     console.log('saving token to localstorage')
//     window.localStorage.setItem('authToken', token)
//     console.log('reloading browser')
//     window.location.reload(true)
//   })
// }

// function signUpNewUser(data) {
//   socket.emit('login new user', JSON.stringify(data))

//   socket.on('assign new token', token => {
//     console.log('saving token to localstorage')
//     window.localStorage.setItem('authToken', token)
//     console.log('reloading browser')
//     window.location.reload(true)
//   })
// }

function loginUser(userType, userData) {
  switch (userType) {
    case 'EXISTING':
      socket.emit('login existing user', JSON.stringify(userData))
      break;

    case 'NEW':
      socket.emit('login new user', JSON.stringify(userData))
      break;

    default:
      socket.emit('login new user', JSON.stringify(userData))
      break;
  }

  socket.on('assign new token', token => {
    console.log('saving token to localstorage')
    window.localStorage.setItem('authToken', token)
    console.log('reloading browser')
    window.location.reload(true)
  })
}

function authenticateUser(changeView, loadMessages, setUser) {
  const token = window.localStorage.getItem('authToken')

  socket.emit('authenticateUser', token)

  socket.on('send user to login', () => changeView('LOGIN'))

  socket.on('invalid username or password', () => alert('invalid username or password'))

  socket.on('user is valid', user => {
    subscribeToMessages(loadMessages)
    changeView('CHAT')
    setUser(JSON.parse(user))
  })
}

function checkIfUsernameIsValid(username, usernameIsValid) {
  socket.emit('verify username is unique', username)

  socket.on('username is available', () => usernameIsValid()) 
}

export { authenticateUser, subscribeToMessages, 
  postMessage, checkIfUsernameIsValid, loginUser }