import { validationResult } from "express-validator";

// project imports
import logger from "server/utils/logger";

export function errorMW(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }

    next();
}

export function errorHandler(err, req, res, next) {
    try {
        logger.error(err.message);

        if (err.statusCode < 500) {
            return res.status(err.statusCode).send(err.message);
        }

        res.status(500).send('Внутренняя ошибка.');
    } catch (error) {
        res.status(500).send('Внутренняя ошибка.');
    }
}

export function pageNotFoundHandler(req, res, next) {
    const { method, path } = req;
    const str = `Can not ${method} ${path}`;
    const page = `<h1>${str}</h1>`;
    res.status(404).send(page);
}
