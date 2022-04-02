const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    account_id: {
        type: String,
        required: true
    },
    asset: {
        type: String,
        required: true
    },
    trade_mount: {
        type: Number,
        required: true
    },
    payout:{
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    },
    profit: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema, "orders")