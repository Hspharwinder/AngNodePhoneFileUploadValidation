
const router = require('express-promise-router')();
const chatOperation = require('../utils/chatOperation');
const fileUpload = require('../utils/fileUpload');
const userOperation = require('../utils/userOperation');
const groupOperation = require('../utils/groupOperation');

// parameter to pass
// message: { type : String },
// messageTime: { type: Date },
// userId: { type: String },
// groupId: { type: String }
router.post('/postChat', chatOperation.insertChat); 

// parameter to pass --  groupId: { type: String }
router.post('/groupChat', chatOperation.getGroupChat);

// parameter to pass -- 
// messageTime: { type: Date },
// userId: { type: String },
// groupId: { type: String }
router.post('/deleteChat', chatOperation.deleteChat); 

// parameter to pass -- file
router.post('/filePost', fileUpload.pdfUpload);

router.get('/user', userOperation.getUser);

router.get('/group', groupOperation.getGroup);


module.exports = router;