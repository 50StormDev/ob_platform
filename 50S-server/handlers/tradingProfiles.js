const db = require("../models");

exports.get = async function(req, res, next){
    try {
        let trading_profile = await db.TradingProfile.find({user: req.params.id})
        await trading_profile[0].populate('accounts','account_name balance').execPopulate()
        return res.status(200).json({
            trading_profile
        })
    } catch(err) {
        return next({
            status:400,
            message: err.message
        })
    }
}