import express from 'express';
import SystemController from './system.controller.js';

const systemRouter = express.Router();

systemRouter.get('/isSynced', SystemController.isSynced);
systemRouter.post('/sync', SystemController.sync);

export default systemRouter;

