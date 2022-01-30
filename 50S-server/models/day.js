const mongoose = require('mongoose')

const daySchema = new mongoose.Schema(
{
  day: {
    type: Number,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
  entry_time: {
    type: String,
    required: true
  },
  overtime: {
    type: Number,
    required: true
  },
  out_time: {
    type: String
  }
})

module.exports =  mongoose.model("Day", daySchema, "days");