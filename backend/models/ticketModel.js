const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    text: {
        type: String,
        require: [true, 'Please add a text value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)