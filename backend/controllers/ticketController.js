const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

// @desc Get goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
    const goals = await Ticket.find({ user: req.user.id })

    res.status(200).json(goals)
})

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    // creates ticket
    const ticket = await Ticket.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(ticket)

})

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private

const updateGoals = asyncHandler(async(req, res) => {
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error('Ticket not found')
    }

    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not foud')
    }
    //Make sure the logged in user matches the goal user
    if(ticket.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body,{
        new: true,
    })

    res.status(200).json(updatedTicket)
})
// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler(async (req, res) => {

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error('Ticket not found')
    }

    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not foud')
    }

    //Make sure the logged in user matches the goal user
    if(ticket.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

   await ticket.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}