import express from 'express'

const router = express.Router()

import {getLocalitiesByCity, getCuisinesByCity, getRestaurantsByCity, getRestaurantList, getRestaurantById, getRestaurantOffers, getRestaurantMenu, searchRestaurantsInCity} from '../controllers/mobController.js'

router.get('/:city_id/localities', getLocalitiesByCity);
router.get('/:city_id/cuisines', getCuisinesByCity);
router.get('/:city_id/restaurants', getRestaurantsByCity);
router.get('/restaurants/list', getRestaurantList);
router.get('/restaurant/:id', getRestaurantById);
router.get('/restaurant/:id/offer', getRestaurantOffers);
router.get('/restaurant/:id/menu', getRestaurantMenu);
router.get('/:city_id/restaurants/search', searchRestaurantsInCity);

export default router;