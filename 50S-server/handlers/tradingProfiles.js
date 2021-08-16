const db = require("../models");

exports.get = async function(req, res, next){
    try {
        let trading_profile = await db.TradingProfile.find({user: req.params.id})
        let {id,totalBalance, totalProfit, total_loss, total_win} = trading_profile[0]
        return res.status(200).json({
            id,
            totalBalance, 
            totalProfit, 
            total_loss,   
            total_win
        })
    } catch(err) {
        return next({
            status:400,
            message: err.message
        })
    }
}