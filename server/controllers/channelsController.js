const Channel = require('../model/channelModel')

module.exports.getChannels = async (req, res, next) => {
    try {
        const channels = await Channel.find({_id:{ $ne:req.params,id } }).select([
            "email", 
            "username", 
            "avtarImage", 
            "_id"
        ])
        return res.json({message: 'youve made it '});
    } catch (error) {
        res.status(500).json({message: error})
    }
}