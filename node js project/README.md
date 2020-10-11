## Start project
1. npm i
2. node index.js


## Postman guidedence

For post request
1. select- body 
2. select- x-www.form-urlencoded
3. then pass key and value


For file post request
1. select- body 
2. select- form-data
3. then pass key and value


## All api in routes/endpoints.js file

http://localhost:3000/filePost
parameter to pass
1. file

Send message done through chat UI
for chat interface vist - http://localhost:3000/
1. In chat interface enter username
2. select a group for chat
3. for join group as second user-  visit again http://localhost:3000/ (open new tab)
4. select same group as selected by user1
5. send message you would get message in both interfaces


http://localhost:3000/groupChat  (Get conversation list)
parameter to pass 
1. groupId: { type: String }


http://localhost:3000/deleteChat  (Delete messages only from his account)
parameter to pass
1. messageTime: { type: Date },
2. userId: { type: String },
3. groupId: { type: String }

## database structure would be like

Table - User (my collection name as chatusers)
-----------------------------------------------
userId    userName    userCreatedAt



Table - Group (my collection name as chatgroups)
-------------------------------------------------
groupId   groupName    groupCreatedAt



Table - Message (my collection name as messages)
-------------------------------------------------
messageId  message  messageTime  userId   groupId






# Build A Group-Chat App in 30 Lines Using Node.js

A simple and (hopefully) to-the-point tutorial to build your first group-chat application using Node.js in less than 30 lines of code.

## Running the program

Run the program by using

```shell
$ node index.js
```
