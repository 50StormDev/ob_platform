const mongoose = require('mongoose');
const Schema = mongoose.Schema;
import Order from './order';
import User from './user';

const daySchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    orders:[{ type: Schema.Types.ObjectId, ref: 'Order' }]
})
module.exports = mongoose.model("Day", daySchema, "days")