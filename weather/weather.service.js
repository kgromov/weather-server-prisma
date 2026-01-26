import {prisma} from "../prisma/client.js";


class WeatherService {

    async getByDate(date) {
        console.log(`getByDate by date = ${date}, type = ${typeof date}`);
        return prisma.dailyTemperature.findUnique({where: {date: date}});
    }
}

export default new WeatherService();