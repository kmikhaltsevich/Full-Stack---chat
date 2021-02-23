const app = require('express')()
const socket = require('socket.io')
const colors = require('colors')
const users = require('./users')()

// App setup
const READY = colors.bgGreen.black(' READY ')
const dataToObject = (name, text, id) => ({ name, text, id })

const PORT = 8000
const server = app.listen(PORT, function () {
  console.log(READY, colors.bgYellow.black(`Listening on port ${ PORT }`), `Full path: http://localhost:${ PORT }`)
})

// Socket setup
const io = socket(server, {
  path: '/',
  allowEIO3: true,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin'],
    credentials: true
  }
})

io.on('connection', function (socket) {
  console.log(READY, colors.bgBlack.green('IO Connected'))
  
  socket.on('userJoined', (data, cb) => {
    if ( !data.name || !data.room) {
      return cb('Data is not correct')
    }
    
    socket.join(data.room)
    users.remove(socket.id)
    users.add({
      id: socket.id,
      name: data.name,
      room: data.room
    })
    
    cb({ userId: socket.id })
    io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
    socket.emit('newMessage', dataToObject('admin', `Hi ${ data.name }`))
    socket.broadcast
      .to(data.room)
      .emit('newMessage', dataToObject('admin', `User ${ data.name } connected`))
  })
  
  socket.on('createMessage', (data, cb) => {
    if ( !data.text) {
      return cb('The text cannot be empty')
    }
    
    const user = users.get(data.id)
    if (user) {
      io.to(user.room).emit('newMessage', dataToObject(user.name, data.text, data.id))
    }
    cb()
  })
  
  socket.on('userLeft', (id, cb) => {
    const user = users.remove(id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', dataToObject('admin', `User ${user.name} left the chat`))
    }
    cb()
  })
  
  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
      io.to(user.room).emit('newMessage', dataToObject('admin', `User ${user.name} left the chat`))
    }
  })
  
})
