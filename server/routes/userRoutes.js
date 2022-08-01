const { register, login} = require('../controllers/usersController')
const { getChannels, addChannels } = require('../controllers/channelsController')
const { getMessages, addMessage } = require('../controllers/messagesController')
const express = require('express')
const auth = require("../auth");

const router = express.Router();

//https://stackoverflow.com/questions/52833169/path-to-regexp-throws-typeerror-cannot-read-property-length-of-undefined
router.post('/register', register)
router.post('/login', login)
router.get('/allchannels/:id', auth, getChannels) // use auth to check user is logged in
router.post('/addchannel', addChannels)
router.post('/addmessage', addMessage)
router.get('/getmessages', getMessages)


//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router