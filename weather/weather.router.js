import express from 'express'
import WeatherController from './weather.controller.js'
const weatherRouter = express.Router();

weatherRouter.get('/years', WeatherController.getYearsToShow);
weatherRouter.get('/seasons', WeatherController.getYearsBySeasonsTemperature);
weatherRouter.get('/months', WeatherController.getYearsByMonthsTemperature);
weatherRouter.get('/summary', WeatherController.getMaxTemperatureDays);
weatherRouter.get('/current', WeatherController.getWeatherForToday);
weatherRouter.get('/:day', WeatherController.getWeatherDayInRange);
weatherRouter.get('/single/:day', WeatherController.getWeatherAtDay);

export default weatherRouter;