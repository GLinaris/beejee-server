import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import https from 'https';

// project imports
import './db/db.js';
import router from './routes/routes.js';
import getHttpsConfig from './utils/get-https-config.js';
import logger from './utils/logger.js';

const app = express();

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: '50mb', extended: true }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(router);

const PORT = process.env.PORT || 4000;
const httpsConfig = getHttpsConfig();

function startServer(port) {
    let server;
    if (httpsConfig) {
        server = https.createServer(httpsConfig, app);
    } else {
        server = http.createServer(app);
    }

    server.listen(port, () => {
        logger.info(`Server is running on port ${port}.`);
    });

    return server;
}

startServer(PORT);
