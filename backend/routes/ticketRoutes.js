const express = require('express')
const router = express.Router()

const { getTicket, setTicket, updateTicket, deleteTicket } = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

// GET & POST API Methods
router.route('/').get(protect, getTicket).post(protect, setTicket)
router.route('/:id').delete(protect, deleteTicket).put(protect, updateTicket)




module.exports = router