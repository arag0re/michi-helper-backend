const express = require('express')
const mongoose = require('mongoose')
const AppSchema = require('../models/app')
const CustomerSchema = require('../models/customer')
const App = mongoose.model('App', AppSchema)
const Customer = mongoose.model('Customer', CustomerSchema)

// Create controller for creation, updating of customers
const appController = {}

appController.addApp = async (req, res) => {
   try {
      // Get user input
      const { name, customerName } = req.body

      // Validate user input
      if (!name && !customerName) {
         res.status(400).send('All input is required')
      }

      const customer = await Customer.findOne({ name: customerName })
      if (!customer) {
         return res.status(409).send('Customer does not exist')
      }

      const oldApp = await App.findOne({ name, customer: customer._id })
      if (oldApp) {
         return res.status(409).send('App already exists')
      }

      // Create new app
      const newApp = new App({
         name,
         createdAt: Date.now(),
         lastUpdated: Date.now(),
         customer: customer._id,
      })

      customer.apps.push(newApp._id)

      await customer.save()

      await newApp.save()

      res.status(200).send()
   } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Internal server error' })
   }
}

appController.getApps = async (req, res) => {
   try {
      const { customerName } = req.body

      if (!customerName) {
         res.status(403).send('All input is required')
      }

      const customer = await Customer.findOne({ name: customerName })
      if (!customer) {
         return res.status(409).send('Customer does not exist')
      }

      const apps = await App.find({ customer: customer._id })
      if (!apps) {
         return res.status(409).send('No apps for this customer')
      }

      res.status(200).send(apps)
   } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Internal server error' })
   }
}

const appRouter = express.Router()

// Add a new customer
appRouter.post('/addApp', appController.addApp)

appRouter.get('/getApps', appController.getApps)

module.exports = appRouter
