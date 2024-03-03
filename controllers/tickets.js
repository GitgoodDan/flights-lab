const Ticket = require('../models/ticket.js');

module.exports = {
    new: newTicket,
    create,
}

function newTicket(req, res) {
    res.render('tickets/new', { flightId: req.params.id });
}


async function create(req, res) {
    try {
        const { seat, price } = req.body;
        const flightId = req.params.id;

        const ticketData = { seat, price, flight: flightId };

        const ticket = await Ticket.create(ticketData);

        res.redirect(`/flights/${flightId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}