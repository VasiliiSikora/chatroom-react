const { register, login } = require('../controllers/usersController')
const express = require('express')

const router = express.Router();

//https://stackoverflow.com/questions/52833169/path-to-regexp-throws-typeerror-cannot-read-property-length-of-undefined
router.post('/register', register)
router.post('/login', login)

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router