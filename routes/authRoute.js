import express from 'express'

const router = express.Router()

import {getToken} from '../controllers/authController.js';

router.post('/token', getToken);

export default router;