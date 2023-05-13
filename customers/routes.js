const express = require('express')
const mongoose = require('mongoose')
const CustomerSchema = require('../models/customer')
const Customer = mongoose.model('Customer', CustomerSchema)

// Create controller for creation, updating of customers
const customerController = {}

customerController.addCustomer = async (req, res) => {
   try {
      // Get user input
      const { name } = req.body

      // Validate user input
      if (!name) {
         res.status(400).send('All input is required')
      }

      // Check if customer already exists
      const oldCustomer = await Customer.findOne({ name })
      if (oldCustomer) {
         return res.status(409).send('User already exists. Please login.')
      }

      // Create new customer
      const newCustomer = new Customer({
         name,
         createdAt: Date.now(),
      })
      await newCustomer.save()

      res.status(200).send()
   } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Internal server error' })
   }
}

customerController.getCustomers = async (req, res) => {
   try {
      const customers = await Customer.find().select({
         _id: 0,
         __v: 0,
         createdAt: 0,
      })
      if (!customers) {
         return res.status(409).send('No Customers found')
      }
      res.status(200).send(customers)
   } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Internal server error' })
   }
}

customerController.deleteCustomer = async (req, res) => {
   try {
      const { name } = req.body
      if (!name) {
         return res.status(400).send('All input is required')
      }

      const customer = await Customer.findOneAndDelete({ name })
      if (!customer) {
         return res.status(403).send('App does not exist')
      }

      res.status(200).send()
   } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Internal server error' })
   }
}

const customerRouter = express.Router()

// Add a new customer
customerRouter.post('/add', customerController.addCustomer)

customerRouter.post('/delete', customerController.deleteCustomer)

customerRouter.get('/getAll', customerController.getCustomers)

module.exports = customerRouter
