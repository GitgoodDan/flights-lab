const Flight = require('../models/flight.js')
const Ticket = require('../models/ticket.js');

module.exports = {
 index,
 new: newForm,
 create,
 show,
 addDes,
};

async function index(req, res) {
  try {
    const flights= await Flight.find({});
    res.render('flights/index', { flights });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
  

function newForm(req, res) {
    res.render('flights/new');
  };

  function create(req, res) {
    const airline = req.body.airline;
    const airport = req.body.airport;
    const flightNo = req.body.flightNo;
    const departs = req.body.departs;
  
    Flight.create({ airline, airport, flightNo, departs }, function(err, newFlight) {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          res.redirect('/flights');
        }
      });
    }


    async function addDes(req, res) {
      try {
          const flight = await Flight.findById(req.params.id);
          if (!flight) {
              return res.status(404).send('Flight not found');
          }
  
          const { airport, arrival } = req.body;
  
          flight.destinations.push({ airport, arrival });
          await flight.save();
  
          res.redirect('/flights/' + flight._id);
      } catch (error) {
          console.error(error);
          res.status(500).send('Internal Server Error');
      }
  }

  async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        if (!flight) {
            return res.status(404).send('Flight not found');
        }
        const tickets = await Ticket.find({ flight: flight._id });
        res.render('flights/show', { flight, tickets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
