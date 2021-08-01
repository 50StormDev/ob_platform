const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: {
        type: String,
        required: true
    },
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
        required: true,
        maximum: 100,
        minimum: 80,
    },
    profit: Number,
    analysis: [
        {type: String}
    ],
    strategyWorked: Boolean,
    entryDate: Date.now()
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema, "orders")