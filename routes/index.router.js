import express from 'express'
import weatherRouter from '../weather/weather.router.js'
import systemRouter from "../system/system.router.js";

const router = express.Router();
router.use('/', systemRouter);
router.use('/weather', weatherRouter);

export default router;