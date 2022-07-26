const mongoose = require('mongoose');
const { Schema } = mongoose;

// https://mongoosejs.com/docs/guide.html
const channelSchema = new Schema({
    channelname: {
        type: String,
        required: true,
        min: 3,
        max: 20, 
        unique: true,
    },
    message: {
        text: { type: String, required: true },
    },
    users: Array,

})

//https://stackoverflow.com/questions/41924961/user-findone-is-not-a-function
module.exports = mongoose.model("Channels", channelSchema)