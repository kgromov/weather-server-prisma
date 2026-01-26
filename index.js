import express from "express";
import router from './routes/index.router.js'
import {prisma} from "./prisma/client.js";

const app = express()
app.use(express.json())

BigInt.prototype.toJSON = function() { return Number(this) }

app.use('/api', router);

const port = process.env.PORT | 9000;
app.listen(port, () => {
    console.log(`Server is started on port ${port} on instance ${process.env.APP_NAME}`);
})

process.on('SIGINT', async () => {
    await prisma.$disconnect()
    process.exit(0)
})
