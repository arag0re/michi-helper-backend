const mongoose = require('mongoose')

// Create User model
const CustomerSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   createdAt: { type: Date, required: true },
   apps: [{ type: String }],
})

module.exports = CustomerSchema
