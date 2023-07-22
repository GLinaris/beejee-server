import createHttpError from "http-errors";

// project imports
import { User } from 'server/db/db';
import logger from 'server/utils/logger';

export async function signin(req, res, next) {
    try {
        const { name, password } = req.body;

        const user = await User.findOne({ where: { name } });
        if (!user) {
            throw createHttpError.Unauthorized('Неверный логин или пароль');
        }

        const isPasswordValid = await user.timingSafeVerifyPassword(password);
        if (!isPasswordValid) {
            throw createHttpError.Unauthorized('Неверный логин или пароль');
        }

        const token = user.generateAuthToken();

        logger.info(`User '${name}' authorized.`)
        res.send({ token });
    } catch (err) {
        next(err);
    }
}
