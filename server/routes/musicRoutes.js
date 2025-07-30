const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController');

router.get('/allmusiclist', musicController.getAllMusic);
router.get('/trendinglist', musicController.getTrendingMusic);
router.get('/topartistslist/:limit', musicController.getTopArtists);

module.exports = router;