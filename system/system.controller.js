import SystemService from './system.service.js';

class SystemController {

    async isSynced(req, res) {
        try {
            const day = new Date(req.params.day);
            const isSynced = await SystemService.isUpToDate();
            return res.status(200).json(isSynced);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    }
}

export default new SystemController();