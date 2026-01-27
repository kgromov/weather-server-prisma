import {prisma} from "../prisma/client.js";


class SystemService {

    async isUpToDate() {
        const today = new Date();
        const count = await prisma.dailyTemperature.count(
            {where: {date: today}}
        );
        return count > 0;
    }
}

export default new SystemService();