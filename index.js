const express = require('express')
const cors = require('cors')
const customerRouter = require('./customers/routes')
const appRouter = require('./apps/routes')
const connectToDatabase = require('./db/connector')
const backend = express()
const { BACKEND_PORT = 3001 } = process.env

// add cors headers
backend.use(cors())
// Use json parser middleware
backend.use(express.json())
// Use router middleware
backend.use('/api/customer', customerRouter)
backend.use('/api/app', appRouter)

connectToDatabase().then(() => {
   // Create WebSocket server
   const server = backend.listen(BACKEND_PORT, () => {
      console.log(`Server running on port ${BACKEND_PORT}`)
   })
})
