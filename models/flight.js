const mongoose = require('mongoose');
const Schema = mongoose.Schema

const desSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        required: true
    },
    arrival: {
        type: Date,
        required: true
    }
});

const flightSchema = new Schema({
    airline:{
        type: String,
        enum: ['American', 'Southwest', 'United'],
        required: true
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999,
    },
    departs: {
        type: Date,
        default: function() {
            const oneYrLater = new Date();
            oneYrLater.setFullYear(oneYrLater.getFullYear() + 1);
            return oneYrLater;
        }
    },
    destinations: [desSchema], 
});


module.exports = mongoose.model('Flight', flightSchema);