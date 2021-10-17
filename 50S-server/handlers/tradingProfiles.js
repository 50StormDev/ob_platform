const db = require("../models");

exports.get = async function(req, res, next){
    try {
        let trading_profile = await db.TradingProfile.find({user: req.params.id})
        await trading_profile[0].populate('accounts').execPopulate()
        let strategyList = await db.Strategy.find()
        return res.status(200).json({
            trading_profile,
            strategyList
        })
    } catch(err) {
        return next({
            status:400,
            message: err.message
        })
    }
}