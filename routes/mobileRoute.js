import express from 'express'

const router = express.Router()

import {createRestaurant, deleteRestaurant, updateRestaurant, createMenu} from '../controllers/mobileController.js'
import {createCuisine, createLocality} from '../controllers/utilController.js'
import {getLocalitiesByCity, getCuisinesByCity, getRestaurantsByCity, getRestaurantList, getRestaurantById, getRestaurantOffers, getRestaurantMenu, searcbRestaurantsInCity} from '../controllers/getMobController.js'

// router.get('/jaipur/restaurants', getRestaurants);
// router.get('/jaipur/restaurants/:id', getRestaurantsById);
// router.get('/jaipur/restaurants/:id/offer', getOffers);
//router.get('/jaipur/restaurants/:id/menu', getMenu);

router.get('/:city_id/localities', getLocalitiesByCity);
router.get('/:city_id/cuisines', getCuisinesByCity)
router.get('/:city_id/restaurants', getRestaurantsByCity);
router.get('/restaurants/list', getRestaurantList);
router.get('/restaurant/:id', getRestaurantById);
router.get('/restaurant/:id/offer', getRestaurantOffers);
router.get('/restaurant/:id/menu', getRestaurantMenu);
router.get('/:city_id/restaurants/search', searcbRestaurantsInCity);


router.post('/jaipur/restaurant', createRestaurant);
router.post('/jaipur/restaurant/menu', createMenu);

router.delete('/jaipur/restaurants/:id', deleteRestaurant);
router.patch('/jaipur/restaurants/:id', updateRestaurant);

router.post('/jaipur/locality', createLocality);
router.post('/jaipur/cuisine', createCuisine);


export default router;
