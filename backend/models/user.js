const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    u_id:{
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        minimun: 0
    },
    totalWins: Number,
    totalTrades: Number,
    tradingProfit: Number
}); 

module.exports = mongoose.model("User", userSchema, "users");