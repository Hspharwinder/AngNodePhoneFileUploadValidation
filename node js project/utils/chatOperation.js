const mongoose = require('mongoose');
const realTimeChat = mongoose.model('message');

// get chat
const getGroupChat = (req, res) => {
    realTimeChat.find({groupId : req.body.groupId})
    .then(result=>{
        return res.status(200).json(result);               
    }).catch(err=>{
        res.status(200).json([{ success: "Fail to retirve record", error: err }])
    })
   
}

// creating chat in DB
const insertChat = (req, res) => {
    // Set values of Chat
    let chat = new realTimeChat(req.body);
    // save chat into DB
    chat.save().then(result => {
        console.log(result);
        if (result.length != 0) {
            console.log(result[0]);
            // return res.status(200).json([{ message: 'row inserted' }])
        }else{
            console.log("No row affected in DB");
            // return res.status(200).json([{ message: 'No row affected in DB', error: err }])
        }
    }).catch(err => {
        console.log("Error While Insertion ", err);
        // res.status(500).json({ error: "Error While Insertion " + err });
    }); 
};

const deleteChat = (req, res) => {
    realTimeChat.deleteOne({messageTime: req.body.messageTime, userId: req.body.userId, groupId: req.body.groupId}).then(result => {
        if (result.deletedCount > 0) {
            return res.status(200).json([{ message: 'delete success', result: result }])
        }else{
            console.log("fail to delete'");
            return res.status(200).json([{ message: 'No record find to deleted' }])
        }
    }).catch(err => {
        console.log("fail to delete ", err);
        res.status(500).json({ error: "fail to delete' " + err });
    }); 
}

module.exports = {
    getGroupChat,
    insertChat,
    deleteChat,
}