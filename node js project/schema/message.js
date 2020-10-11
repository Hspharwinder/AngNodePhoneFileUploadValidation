var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
// var ObjectId = require('mongoose').ObjectId;

var message = new mongoose.Schema({
    // unreadMessage: { type: Boolean }, 
    message: { type : String },
    messageTime: { type: Date },
    userId: { type: String },
    groupId: { type: String }
});

// mongoose.set('useCreateIndex', true); // for remove (node:11052) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// autoIncrement.initialize(mongoose.connection);

// wishListSchema.plugin(autoIncrement.plugin, 'wishList');
mongoose.model('message', message);