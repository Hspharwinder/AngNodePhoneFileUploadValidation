var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
// var ObjectId = require('mongoose').ObjectId;

var chatUser = new mongoose.Schema({
    userId: { type : String},
    userName: { type : String },
    userCreatedAt: { type: Date } 
});

// mongoose.set('useCreateIndex', true); // for remove (node:11052) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// autoIncrement.initialize(mongoose.connection);

// wishListSchema.plugin(autoIncrement.plugin, 'wishList');
mongoose.model('chatUser', chatUser);