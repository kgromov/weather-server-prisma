import SystemService from './system.service.js';
import {StatusCode, SyncStatus} from "../weather/models/weather.models.js";

class SystemController {

    async healthCheck(req, res) {
        return res.status(200).json({status: "OK", app: `${process.env.APP_NAME}`});
    }

    async isSynced(req, res) {
        try {
            const isSynced = await SystemService.isUpToDate();
            return res.status(200).json(isSynced);
        } catch (err) {
            console.error(err);
            return res.status(500).json({error: err.message});
        }
    }

    async sync(req, res) {
        let status;
        try {
            status = new SyncStatus(
                StatusCode.SUCCESS,
                `Sync succeed: Up to date ${new Date().toISOString().slice(0, 10)}`
            );
        } catch (err) {
            status = new SyncStatus(
                StatusCode.FAILURE, `Sync failed: Unable to save records  due to:  ${err}`
            );
        }
        return res.status(status.code).json(status);
    }
}

export default new SystemController();