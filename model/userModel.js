const mongoose = require('mongoose');
const { Schema } = mongoose;

// https://mongoosejs.com/docs/guide.html
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20, 
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8, 
    },
})

//https://stackoverflow.com/questions/41924961/user-findone-is-not-a-function
module.exports = mongoose.model("Users", userSchema)