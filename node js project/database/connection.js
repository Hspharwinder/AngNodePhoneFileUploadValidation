const mongoose = require('mongoose');

require('../schema/message');
require('../schema/chatUser');
require('../schema/chatGroup');

const uri = 'mongodb://localhost:27017/NetSetMachineTest';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log(uri);
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});