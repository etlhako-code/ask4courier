'use strict';

const express = require('express');
const qouteControll = require('../controllers/qouteController');
const router = express.Router();

router.get('/qoutes', qouteControll.getAllQuotes);
router.get('/qoutes/Destination', qouteControll.getQuoteByDestination);
router.get('/qoutes/Pickup', qouteControll.getQuoteByPickup);
router.get('/qoute/:id', qouteControll.getQuote);
router.post('/qoute', qouteControll.addQuote);
router.put('/qoute/:id', qouteControll.updateQuote);
router.delete('/qoute/:id', qouteControll.deleteQuote);



module.exports = {
    routes: router
}