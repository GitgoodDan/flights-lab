var express = require('express');
var router = express.Router();
const ticketCtrl = require('../controllers/tickets.js')

router.get('/:id/tickets/new', ticketCtrl.new);
router.post('/:id/tickets', ticketCtrl.create);