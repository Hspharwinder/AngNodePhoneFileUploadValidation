var mongoose = require('mongoose');

var message = new mongoose.Schema({
    // unreadMessage: { type: Boolean }, 
    message: { type : String },
    messageTime: { type: Date },
    userId: { type: String },
    groupId: { type: String }
});

mongoose.model('message', message);
