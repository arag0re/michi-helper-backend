const mongoose = require('mongoose')

// Create User model
const AppSchema = new mongoose.Schema({
   name: { type: String, required: true },
   createdAt: { type: Date, required: true },
   lastUpdated: { type: Date, required: true },
   customer: { type: String, required: true },
})

module.exports = AppSchema
