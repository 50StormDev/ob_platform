const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    pair: {
        type: String,
        required: true
    },
    payout: Number,
    estrategy: [{type: String}],
    result: Number,
    strategyWorked: Boolean,
    entryDate: Date
});

module.exports = mongoose.model("Order", orderSchema, "orders")