import express from "express";
import router from './routes/index.router.js'
import {prisma} from "./prisma/client.js";
import SystemController from './system/system.controller.js';

const app = express()
app.use(express.json())

BigInt.prototype.toJSON = function() { return Number(this) }

app.use('/api', router);
app.get("/health", SystemController.healthCheck);

const port = process.env.PORT | 9000;
app.listen(port, () => {
    console.log(`Server is started on port ${port} on instance ${process.env.APP_NAME}`);
})

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
})
