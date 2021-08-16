const mongoose = require('mongoose');
const TradingProfile = require('./trading_profile');

// Brooker has to be referenciated to a user tradingProfile
// Has to have: Name, timerLock, lastLogin, Password

const brookerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    client_list:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TradingProfile"
    }],
    account_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }]
    
})

// Remove the Brooker from TradingProfile
brookerSchema.pre("remove", async function(next){
    try {
        // find the trandingProfile
        let tradingProfile = await TradingProfile.findById(this.name);
        //remove the brooker from tradingProfile
        tradingProfile.tradingBrooker.remove(this.id);
        // save tradingProfile
        tradingProfile.save();
        return next();
    } catch(err) {
        return(err);
    }
})

module.exports = mongoose.model("Brooker", brookerSchema, 'brookers');