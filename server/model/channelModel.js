const mongoose = require('mongoose');
// https://stackoverflow.com/questions/51171529/generate-auto-increment-field-using-mongoose
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { Schema } = mongoose;

// https://mongoosejs.com/docs/guide.html
const channelSchema = new Schema({
    _id: {
        type: Number
    },
    channelname: {
        type: String,
        required: true,
        min: 3,
        max: 20, 
        unique: true,
    },
});
channelSchema.plugin(AutoIncrement);

//https://stackoverflow.com/questions/41924961/user-findone-is-not-a-function
module.exports = mongoose.model("Channels", channelSchema)