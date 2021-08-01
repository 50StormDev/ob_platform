const mongoose = require('mongoose');
const User = require('./user');
const Account = require('./account');
const Brooker = require('./brooker');
const Schema = mongoose.Schema;

// Trading profile reference to a specific user and its a trading profile for a specific Brooker
// One User can habe multiple TradingProfiles, wich can also have multiple accounts
//    User > *TradingProfiles > *Trading Account
const tradingProfileSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tradingBrooker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brooker"
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }],
    total_win: {
        type: Integer,
        required: true,
        min: 0
    },
    total_loss: {
        type: Integer,
        required: true,
        min: 0
    },
    platform_password: {
        type: String,
        required: true
    }
}); 

// Remove the trading profile from User
tradingProfileSchema.pre('remove', async function(next){
    try {
        // find the user
        let user = await User.findById(this.user);
        // remove the id of the message from their messages list
        user.tradingProfile.remove(this.id);
        // save that user
        await user.save();
        return next();
    } catch(err) {
        return next(err);
    }
})


module.exports = mongoose.model("TradingProfile", userSchema, "tradingProfiles");