const { register, login} = require('../controllers/usersController')
const { getChannels } = require('../controllers/channelsController')
const express = require('express')
const auth = require("../auth");

const router = express.Router();

//https://stackoverflow.com/questions/52833169/path-to-regexp-throws-typeerror-cannot-read-property-length-of-undefined
router.post('/register', register)
router.post('/login', login)
router.get('/allchannels/:id', auth, getChannels) // use auth to check user is logged in

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router