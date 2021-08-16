const mongoose = require('mongoose');

const strategySchema = new mongoose.Schema({
    strategy_name: {
        type: String,
        required: true
    },
    max_loss: {
        type: Number,
        required: true,
        min: 0
    },
    max_win: {
        type: Number,
        require: true,
        min: 0
    },
    consecutive_loss: {
        type: Number,
        required: true,
        min: 0
    },
    risk: {
        type: Number,
        required: true,
        min: 0
    },
    strategy_users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TradingProfile"
    }]
})

module.exports = mongoose.model("Strategy", strategySchema, "strategies")