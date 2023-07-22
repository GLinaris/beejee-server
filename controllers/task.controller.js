import { Task } from 'server/db/db';
import { getIdParam } from 'server/utils/helpers';

export async function getTasks(req, res, next) {
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'user', 'email', 'desc', 'done', 'edited']
        });
        res.send(tasks);
    } catch (err) {
        next(err);
    }
}

export async function createTask(req, res, next) {
    try {
        const { user, email, desc } = req.body;
        await Task.create({ user, email, desc });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

export async function setDone(req, res, next) {
    try {
        const { done } = req.body;
        const id = getIdParam(req);
        await Task.update({ done }, { where: { id } });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

export async function editTask(req, res, next) {
    try {
        const { desc } = req.body;
        const id = getIdParam(req);
        await Task.update({ desc, edited: true }, { where: { id } });
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}
