Base = require "./Base"
mongoose = require "mongoose"

schema = mongoose.Schema
  name: { type: String, required: true }

Base.timestampify schema

module.exports = Base.model "Category", schema