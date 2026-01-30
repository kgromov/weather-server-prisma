import {prisma} from "../prisma/client.js";


class WeatherService {

    async getByDate(date) {
        console.log(`getByDate by date = ${date}, type = ${typeof date}`);
        return prisma.dailyTemperature.findUnique({where: {date: date}});
    }

    // Some mess with duplicated ids - seems prisma ORM can't translate result set properly
    async getAllByDay(date, numYears) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return prisma.$queryRaw`
            SELECT *
            FROM DayTemperature 
            WHERE MONTH(date) = ${month} AND DAY(date) = ${day}
            ORDER BY date DESC
        `;
    }

    async getYearsToShow() {
        return prisma.$queryRaw`
          SELECT COUNT(DISTINCT(YEAR(date))) FROM DailyTemperature
        `;
    }

    async getYearsBySeasonsTemperature() {
        return prisma.$queryRaw`
            SELECT CONCAT_WS(', ', season, year) as yearSeason,
                   MIN(minTemp) as minTemp, MAX(maxTemp) as maxTemp, ROUND(AVG(avgTemp), 2) as avgTemp FROM
                (SELECT CASE
                            WHEN MONTH(date) IN (1, 2, 12) THEN 'WINTER'
                            WHEN MONTH(date)  > 2 AND MONTH(date)  < 6 THEN 'SPRING'
                            WHEN MONTH(date)  > 5 AND MONTH(date)  < 9 THEN 'SUMMER'
                            WHEN MONTH(date)  > 8 AND MONTH(date)  < 12 THEN 'AUTUMN'
                        END as season,
                        YEAR(date)  AS year,
                        LEAST(
                                morningTemperature,
                                afternoonTemperature,
                                eveningTemperature,
                                nightTemperature
                        ) AS minTemp,
                        GREATEST(
                                morningTemperature,
                                afternoonTemperature,
                                eveningTemperature,
                                nightTemperature
                        ) AS maxTemp,
                        (
                            morningTemperature +
                            afternoonTemperature +
                            eveningTemperature +
                            nightTemperature
                        ) / 4.0 AS avgTemp
                 FROM DailyTemperature
                 ORDER BY date DESC) AS months
            GROUP BY season, year;
        `;
    }

    async getYearsByMonthsTemperature() {
        return prisma.$queryRaw`
            SELECT DATE_FORMAT(CONCAT_WS('-', year, month, '-01'), '%M, %Y') as yearMonth,
                   MIN(minTemp) as minTemp, MAX(maxTemp) as maxTemp, ROUND(AVG(avgTemp), 2) as avgTemp FROM
                (SELECT MONTH(date) AS month,
                        YEAR(date)  AS year,
                        LEAST(
                                morningTemperature,
                                afternoonTemperature,
                                eveningTemperature,
                                nightTemperature
                        ) AS minTemp,
                        GREATEST(
                                morningTemperature,
                                afternoonTemperature,
                                eveningTemperature,
                                nightTemperature
                        ) AS maxTemp,
                        (
                            morningTemperature +
                            afternoonTemperature +
                            eveningTemperature +
                            nightTemperature
                        ) / 4.0 AS avgTemp
                 FROM DailyTemperature
                 ORDER BY date DESC) AS months
            GROUP BY month, year;
        `;
    }

    async getYearsTemperature() {
        return prisma.$queryRaw`
            SELECT year,
                   MIN(minTemp) as minTemp, MAX(maxTemp) as maxTemp, ROUND(AVG(avgTemp), 2) as avgTemp FROM
                (SELECT YEAR(date) AS year,
                        LEAST(
                                morningTemperature,
                                afternoonTemperature,
                                eveningTemperature,
                                nightTemperature
                        ) AS minTemp,
                        GREATEST(
                                morningTemperature,
                                afternoonTemperature,
                                eveningTemperature,
                                nightTemperature
                        ) AS maxTemp,
                        (
                            morningTemperature +
                            afternoonTemperature +
                            eveningTemperature +
                            nightTemperature
                        ) / 4.0 AS avgTemp
                 FROM DailyTemperature
                 ORDER BY date DESC) AS months
            GROUP BY year;
        `;
    }
}

export default new WeatherService();