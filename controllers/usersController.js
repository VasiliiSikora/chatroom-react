const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

// const router = express.Router();

// https://stackoverflow.com/questions/58189365/async-await-in-nodejs-mongoose
// https://stackoverflow.com/questions/46457071/using-mongoose-promises-with-async-await
module.exports.register = async (req,res, next) => {
    try {
        const {username, email, password} = req.body;

        const usernameCheck = await User.findOne({ username });
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
        return res.json({status: true, user});
    } catch (err) {
        // https://expressjs.com/en/guide/error-handling.html
        res.status(500).json({message: err})
    }
}

module.exports.login = async (req,res, next) => {
    try {
        const {username, password} = req.body;
        // Search mongoDB for user account
        const userCheck = await User.findOne({ username });
        if (!userCheck) {
            return res.json({msg:'Incorrect username or password', status: false});
        }
        const isPwordValid = await bcrypt.compare(password, userCheck.password);
        if (!isPwordValid) {
            return res.json({msg:'Incorrect username or password', status: false});
        }

        // Handle session cookies: https://www.freecodecamp.org/news/how-to-build-a-fullstack-authentication-system-with-react-express-mongodb-heroku-and-netlify/
        const token = jwt.sign(
            {
                userId: userCheck.username,
                userEmail: userCheck.email
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
        )

        return res.json({status: true, token}); //(token was userCheck
    } catch (err) {
        // https://expressjs.com/en/guide/error-handling.html
        res.status(500).json({message: err})
    }
}



