import express from 'express'

const router = express.Router()

import {createCuisine, createLocality} from '../controllers/utilController.js'
import {createRestaurant, deleteRestaurant, updateRestaurant, createMenu} from '../controllers/postController.js'

router.post('/jaipur/restaurant', createRestaurant);
router.post('/jaipur/restaurant/menu', createMenu);

router.delete('/jaipur/restaurants/:id', deleteRestaurant);
router.patch('/jaipur/restaurants/:id', updateRestaurant);

router.post('/jaipur/locality', createLocality);
router.post('/jaipur/cuisine', createCuisine);

export default router;