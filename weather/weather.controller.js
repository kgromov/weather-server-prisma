import WeatherService from './weather.service.js'

class WeatherController {

    async getWeatherAtDay(req, res) {
        try {
            const day = new Date(req.params.day);
            const weather = await WeatherService.getByDate(day);
            return res.status(200).json(weather);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new WeatherController();