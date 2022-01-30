const mongoose = require('mongoose');
const Brooker = require( "./brooker");


const accountSchema = new mongoose.Schema({
    account_name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        min: 0
    },
    lifes: {
        type: Number,
        
    },
    wins: {
        type: Number,
        required: true,
        min: 0
    },
    losses: {
        type: Number,
        require: true,
        min: 0
    },
    withdrawable: {
        status: {
            type: Boolean
        },
        withdrawable_amount: {
            type: Number,
            min: 0
        }
    },
    strategy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Strategy"
    },
    target: {
        type: Number,
        min: 0
    }, 
    otc: {
        otc_status: {
            type: Boolean
        },
        otc_amount: {
            type: Number,
            min: 0
        }
    },  
    trading_profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TradingProfile",
        required: true
    }, 
    brooker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brooker"
    },
    orders_day: [{
        day: {
            type: String
        },
        orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
        }]
    }]
}, {timestamps: true})

accountSchema.pre("remove", async function(next){
    try {
        let brooker = await Brooker.findById(this.brooker);
        //remove the brooker from tradingProfile
        await brooker.account_list.remove(this.id);
        // save tradingProfile
        await brooker.save();

        let foundUser = await mongoose.model('TradingProfile').findById(this.trading_profile);
        await foundUser.accounts.remove(this.id);
        console.log(foundUser.accounts)
        await foundUser.save()
        return next();
    } catch(err) {
        return(err);
    }
})


module.exports =  mongoose.model("Account", accountSchema, "accounts");