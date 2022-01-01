const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
    strategy_name: {
        type: String,
        required: true
    },
    max_loss: {
        type: Number,
        required: true,
        min: 1
    },
    max_win: {
        type: Number,
        require: true,
        min: 1
    },
    consecutive_loss: {
        type: Number,
        required: true,
        min: 1
    },
    consecutive_win: {
        type: Number,
        min: 1
    },
    risk: {
        type: Number,
        required: true,
        min: 0
    },
    weekly_risk:{
        type: Number,
        required: true,
        min: 1
    },
    method: {
        type: String,
        required: true
    },
    otc: {
        type: Boolean,
        required: true
    },
    strategy_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TradingProfile"
    }]
})

module.exports = mongoose.model("Strategy", strategySchema, "strategies")