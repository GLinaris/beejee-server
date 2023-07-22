import Router from "express";

// project imports
import { jwtMw } from "server/middleware/auth.middleware";
import {
    errorHandler,
    errorMW,
    pageNotFoundHandler
} from 'server/middleware/error';

import { signin } from "server/controllers/auth.controller";
import {
    createTask,
    editTask,
    getTasks,
    setDone
} from 'server/controllers/task.controller';
import {
    createTaskValidator,
    editTaskValidator,
    setDoneValidator,
    signinValidator
} from "server/validations/validation";

const router = new Router();

router.post('/signin', [signinValidator, errorMW], signin);
router.get('/tasks', getTasks);
router.post('/task', [createTaskValidator, errorMW], createTask);
router.patch('/done/:id', [jwtMw, setDoneValidator, errorMW], setDone);
router.patch('/edit/:id', [jwtMw, editTaskValidator, errorMW], editTask);

router.use(errorHandler);
router.use(pageNotFoundHandler);

export default router;
