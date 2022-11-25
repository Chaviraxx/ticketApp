const express = require('express')
const router = express.Router()

const { getGoals, setGoals, updateGoals, deleteGoals } = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

// GET & POST API Methods
router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').delete(protect, deleteGoals).put(protect, updateGoals)

// // Get API method
// router.get('/', getGoals)

// // SET API method
// router.post('/', setGoals)

// // UPDATE API method
// router.put('/:id', updateGoals)

// // DELETE API method
// router.delete('/:id', deleteGoals)


module.exports = router