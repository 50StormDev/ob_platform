const mongoose = require('mongoose');
const User = require('./user');
const Account = require('./account').default;
const Brooker = require('./brooker').default;
const Schema = mongoose.Schema;

// Trading profile reference to a specific user and its a trading profile for a specific Brooker
// One User can habe multiple TradingProfiles, wich can also have multiple accounts
//    User > *TradingProfiles > *Trading Account
const tradingProfileSchema = new Schema({
    //reference id
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    total_win: {
        type: Number,
        required: true,
        min: 0
    },
    total_loss: {
        type: Number,
        required: true,
        min: 0
    },
    totalBalance:{
        type: Number,
        required: true,
        min: 0
    },
    totalProfit: {
        type: Number,
        required: true
    },
    // list of a pairs traded and how many trades
    pairs_traded: {
        pair: String,
        win_count: {
            type: Number,
            min: 0
        },
        loss_count: {
            type: Number,
            min: 0
        }
    },
    notification: [{
        message: {
            type: String
        },
        read: {
            type: Boolean
        }
    }],
    // return name of brooker and withdraw list.numer
    withdraw_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brooker"
    }],
    accounts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }],
    personal_account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account"
    }
},{timestamps: true}); 

// Remove the trading profile from User
// tradingProfileSchema.pre('remove', async function(next){
//     try {
//         // find the user
//         let user = await User.findById(this.user);
//         // remove the id of the message from their messages list
//         user.tradingProfile.remove(this.id);
//         // save that user
//         await user.save();
//         return next();
//     } catch(err) {
//         return next(err);
//     }
// })


module.exports = mongoose.model("TradingProfile", tradingProfileSchema, "tradingProfiles");