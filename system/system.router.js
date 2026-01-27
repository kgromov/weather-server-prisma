import express from 'express';
import SystemController from './system.controller.js';

const systemRouter = express.Router();

systemRouter.get('/isSynced', SystemController.isSynced);

export default systemRouter;

