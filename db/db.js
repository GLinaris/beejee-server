import Sequelize from 'sequelize';

// project imports
import logger from 'server/utils/logger';
import setDefaultTableRows from './initial.js';

// models
import defineTask from './models/task.js';
import defineUser from './models/user.js';

const db = {};

async function connectToDatabase() {
    const sequelize = new Sequelize(
        process.env.PG_DB,
        process.env.PG_USER,
        process.env.PG_PASSWORD,
        {
            host: process.env.PG_HOST,
            dialect: 'postgres',
            port: process.env.PG_PORT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            logging: logger.info.bind(logger),
        }
    );

    try {
        await sequelize.authenticate();
        logger.info('Connection to db has been established successfully.');
        return sequelize;
    } catch (err) {
        logger.error('Unable to connect to the database: ' + err?.original?.routine);
        throw err;
    }
}

function createModels(sequelize) {
    try {
        db.User = defineUser(sequelize);
        db.Task = defineTask(sequelize);
    } catch (err) {
        logger.error('Unable to create db models: ' + err.message);
        throw err;
    }
}

async function init() {
    try {
        const sequelize = await connectToDatabase();

        createModels(sequelize);

        await sequelize.sync();
        logger.info('Database and tables created successfully');

        await setDefaultTableRows(sequelize);

        return sequelize;
    } catch (err) {
        logger.error(err.message);
        throw err;
    }
}

db.sequelize = await init();

export const User = db.User;
export const Task = db.Task;
export const sequelize = db.sequelize;

export default db.sequelize;
