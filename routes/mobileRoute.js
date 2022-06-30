import express from 'express'

const router = express.Router()

import {getRestaurants, getRestaurantsById, createRestaurant, deleteRestaurant, updateRestaurant, getOffers, getMenu/*, getCuisines, getLocalities*/ } from '../controllers/mobileController.js'

router.get('/jaipur/restaurants', getRestaurants);
router.get('/jaipur/restaurants/:id', getRestaurantsById);
router.get('/jaipur/restaurants/:id/offer', getOffers);
router.get('/jaipur/restaurants/:id/menu', getMenu);
//router.get('/jaipur/cuisines', getCuisines);
//router.get('/jaipur/locality', getLocalities);

//router.get('/jaipur/restaurants/:id/offer',getOffers);

router.post('/jaipur/restaurant', createRestaurant);
router.delete('/jaipur/restaurants/:id', deleteRestaurant);
router.patch('/jaipur/restaurants/:id', updateRestaurant);

export default router;
