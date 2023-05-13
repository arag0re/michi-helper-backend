require('dotenv').config()
const mongoose = require('mongoose')

const connectToDatabase = async () => {
   try {
      await mongoose.connect(
         `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}?authSource=admin`,
         {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         },
      )
      console.log('Connected to MongoDB')
   } catch (error) {
      console.error('Failed to connect to MongoDB:', error.message)
      process.exit(1) // Exit process with failure
   }
}

module.exports = connectToDatabase
