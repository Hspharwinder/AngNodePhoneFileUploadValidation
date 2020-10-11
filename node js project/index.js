const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');
require('./database/connection');
const chatOperation = require('./utils/chatOperation');
const userOperation = require('./utils/userOperation');
const groupOperation = require('./utils/groupOperation');
const app = express();
const server = http.createServer(app);
const io = socketio(server);


// Then use it before your routes are set up:
app.use(cors());

app.use(bodyParser.json()); // parse the body data in json format post by http 
app.use(bodyParser.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord HSP';

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.use('/', require('./routes/endPoints'));

// Run when client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
      const groupId =  uuidv4();
      user = userJoin(socket.id, username, room, new Date(), new Date(), groupId );   
      creatingRoom(user, room, botName);
    });

    const creatingRoom = (user, newRoom, botName) =>{
      socket.join(newRoom);
      const userDetail = {
        userId: user.id,
        userName: user.username,
        userCreatedAt: user.userCreatedAt
      }
      // add user in db
      userOperation.addUser({ body: userDetail });

      const groupDetail = {
        groupId:user.groupId,
        groupName: newRoom,
        groupCreatedAt: user.groupCreatedAt
      }
      // add group in db
      groupOperation.addGroup({ body: groupDetail });

       // Welcome current user
       socket.emit('message', formatMessage(botName, 'Welcome to HSP ChatCord!'));
    
       // Broadcast when a user connects
       socket.broadcast
         .to(newRoom)
         .emit(
           'message',
           formatMessage(botName, `${user.username} has joined the chat`)
         );
       
       // Send users and room info
       io.to(newRoom).emit('roomUsers', {
         room: newRoom,
         users: getRoomUsers(user.room)
       });
    }

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
      let user = getCurrentUser(socket.id);
      const postMsg = { 
        // userName: user.room,
        message: msg,
        messageTime: new Date(),
        userId: user.id,
        groupId: user.groupId,
       };
       // add chat in db
      chatOperation.insertChat({ body: postMsg });

      io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    // Runs when client disconnects
    socket.on('disconnect', () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          'message',
          formatMessage(botName, `${user.username} has left the chat`)
        );
  
        // Send users and room info
        io.to(user.room).emit('roomUsers', {
          room: user.room,
          users: getRoomUsers(user.room)
        });
      }
    });
  });
  
  const PORT = process.env.PORT || 3000;
  
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
