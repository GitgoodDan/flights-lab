const express = require('express');
const router = express.Router();
const flightCtrl = require('../controllers/flights.js');


router.get('/', flightCtrl.index);
router.get('/new', flightCtrl.new);
router.post('/', flightCtrl.create);
router.get('/:id', flightCtrl.show);
router.post('/:id/addDes', flightCtrl.addDes);


module.exports = router;