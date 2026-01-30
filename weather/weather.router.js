import express from 'express'
import WeatherController from './weather.controller.js'
const weatherRouter = express.Router();

weatherRouter.get('/yearsToShow', WeatherController.getYearsToShow);
weatherRouter.get('/seasons', WeatherController.getYearsBySeasonsTemperature);
weatherRouter.get('/months', WeatherController.getYearsByMonthsTemperature);
weatherRouter.get('/years', WeatherController.getYearsTemperature);
weatherRouter.get('/current', WeatherController.getWeatherForToday);
weatherRouter.get('/:day', WeatherController.getWeatherDayInRange);
weatherRouter.get('/single/:day', WeatherController.getWeatherAtDay);

export default weatherRouter;