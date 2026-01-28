import {prisma} from "../prisma/client.js";


class WeatherService {

    async getByDate(date) {
        console.log(`getByDate by date = ${date}, type = ${typeof date}`);
        return prisma.dailyTemperature.findUnique({where: {date: date}});
    }

    async getAllByDay(date, numYears) {
        console.log(`getAllByDay by date = ${date}, years = ${numYears}`);
        return prisma.$queryRaw`
          SELECT * FROM DailyTemperature
          WHERE MONTH(date) = 1
            AND DAY(date) = 15
          ORDER BY date DESC
          LIMIT ${numYears}
        `;
    }

    async getYearsToShow() {
        return prisma.$queryRaw`
          SELECT COUNT(DISTINCT(YEAR(date))) FROM DailyTemperature
        `;
    }

    async getYearsBySeasonsTemperature() {
        throw new Error('Not implemented');
    }

    async getYearsByMonthsTemperature() {
        throw new Error('Not implemented');
    }

    async getMaxTemperatureDays() {
        throw new Error('Not implemented');
    }

    async getWeatherForToday() {
        throw new Error('Not implemented');
    }
}

export default new WeatherService();