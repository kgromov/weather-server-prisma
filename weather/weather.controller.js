import WeatherService from './weather.service.js'

class WeatherController {

    getYearsToShow(req, res) {
        return WeatherController.handler(req, res, async () => await WeatherService.getYearsToShow());
    }

    getYearsBySeasonsTemperature(req, res) {
        return WeatherController.handler(req, res, async () => {
            return await WeatherService.getYearsBySeasonsTemperature();
        });
    }

    getYearsByMonthsTemperature(req, res) {
        return WeatherController.handler(req, res, async () => {
            return await WeatherService.getYearsByMonthsTemperature();
        });
    }

    getMaxTemperatureDays(req, res) {
        return WeatherController.handler(req, res, async () => {
            return await WeatherService.getMaxTemperatureDays();
        });
    }

    getWeatherForToday(req, res) {
        return WeatherController.handler(req, res, async () => {
            return await WeatherService.getByDate(new Date());
        });
    }

    getWeatherDayInRange(req, res) {
        return WeatherController.handler(req, res, async () => {
            const day = new Date(req.params.day);
            const years = new Date(req.params.day);
            return await WeatherService.getAllByDay(day, years);
        });
    }

    async getWeatherAtDay(req, res) {
        return WeatherController.handler(req, res, async () => {
            const day = new Date(req.params.day);
            return await WeatherService.getByDate(day);
        });
    }

    static async handler(req, res, fn) {
        try {
            const response = await fn(req, res);
            return res.status(200).json(response);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new WeatherController();