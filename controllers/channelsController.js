const Channel = require('../model/channelModel')

module.exports.addChannels = async (req, res, next) => {
    try {
        const {channelname, message } = req.body;

        const channelCheck = await Channel.findOne({ channelname });
        if (channelCheck) {
            return res.json({msg:'Chatroom name taken', status: false});
        }
        const channel = await Channel.create({
            channelname,
            message,
        });
        return res.json({message: 'success', channel});
    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports.getChannels = async (req, res, next) => {
    try {
        // const channels = await Channel.find({_id:{ $ne:req.params,id } }).select([
        //     "email", 
        //     "username", 
        //     "avtarImage", 
        //     "_id"
        // ])
        return res.json({message: 'youve made it '});
    } catch (error) {
        res.status(500).json({message: error})
    }
}