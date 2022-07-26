const User = require('../model/userModel')
const bcrypt = require('bcrypt')
// const express = require('express')

// const router = express.Router();

// https://stackoverflow.com/questions/58189365/async-await-in-nodejs-mongoose
// https://stackoverflow.com/questions/46457071/using-mongoose-promises-with-async-await
module.exports.register = async (req,res, next) => {
    try {
        const {username, email, password} = req.body;

        const usernameCheck = await User.findOne({ username });
        console.log(usernameCheck)
        if (usernameCheck) {
            return res.json({msg:'username taken', status: false});
        }
        const emailCheck = await User.findOne({ email })
        if (emailCheck) {
            return res.json({msg:'email alreadu in use', status: false});
        }
        // https://www.npmjs.com/package/bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user});
    } catch (err) {
        // https://expressjs.com/en/guide/error-handling.html
        res.status(500).json({message: err})
        // next(err); // change?
    }
}

// //https://stackoverflow.com/questions/52833169/path-to-regexp-throws-typeerror-cannot-read-property-length-of-undefined
// router.post('/register', register)

// module.exports = router