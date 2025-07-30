const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favoritesController');

router.post('/:userId/favorites/update', favoritesController.addFavorite);
router.delete('/:userId/favorites/update', favoritesController.removeFavorite);
router.get('/:userId/favorites/update', favoritesController.getFavoriteIds);
router.get('/:userId/favoriteslist', favoritesController.getFavoriteList);

module.exports = router;