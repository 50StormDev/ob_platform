const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    pair: {
        type: String,
        required: true
    },
    timeframe: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payout:{
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema, "orders")