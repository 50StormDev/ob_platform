const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Account = require('./account').default;
const TradingProfile = require('./trading_profile')

const transactionSchema = new Schema({
    trading_profile: {
        type: String,
        required: true
    },
    transaction_history:[{
        transaction_day: {
            type: String,
            required: true
        },
        transaction_action: {
            type: String,
            required: true
        },
        transaction_account:{
            type: String,
            required: true
        },
        transaction_amount: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("Transaction", transactionSchema, "transactions")