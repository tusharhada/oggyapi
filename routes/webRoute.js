import express from 'express'

const router = express.Router()

import {getLocalitiesByCity, getCuisinesByCity, getRestaurantsList, getRestaurantById, getRestaurantOffers, getRestaurantMenu, searchLocation, searchRestaurantsByLocation, getRestaurantChains} from '../controllers/webController.js';

router.get('/:city_id/localities', getLocalitiesByCity);    //Homepage Localities Section
router.get('/:city_id/cuisines', getCuisinesByCity);

router.get('/restaurants/list', getRestaurantsList);        //Search Results

router.get('/restaurant/:id', getRestaurantById);           //Restaurant Detail Page
router.get('/restaurant/:id/offer', getRestaurantOffers);
router.get('/restaurant/:id/menu', getRestaurantMenu);

router.get('/location/search', searchLocation);             //Homepage Searchbar
router.get('/restaurants/search', searchRestaurantsByLocation);//Homepage Searchbar

router.get('/restaurants/chains', getRestaurantChains);      //Homepage Chains Section

export default router;
