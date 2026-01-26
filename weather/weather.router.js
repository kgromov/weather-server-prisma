import express from 'express'
import WeatherController from './weather.controller.js'
const weatherRouter = express.Router();

weatherRouter.get('/:day', WeatherController.getWeatherAtDay)

export default weatherRouter;