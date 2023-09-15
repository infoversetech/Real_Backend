require("express-async-errors");
import http from 'http';
import express from 'express';
import routes from './routes';
import cors from 'cors';
import { Config } from './config/index';

import { morganMiddleware } from './middlewares/morgan.middleware';
import { errorHandler } from './middlewares/errorHandler';
import { logger } from './library/logger';

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10MB' }));
app.use(morganMiddleware);
app.use(cors());

app.use('/api', routes);
app.use(errorHandler);

server.listen(Config.server.port, Config.server.host, () => {
    logger.info(`Server is running on port ${Config.server.port}`);
});
