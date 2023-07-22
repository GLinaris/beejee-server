import { body } from 'express-validator';

export const signinValidator = [
    body("name")
        .exists({ checkFalsy: true })
        .withMessage("Имя пользователя обязателно")
        .isString()
        .withMessage("Имя пользователя должно быть строкой"),
    body("password")
        .exists()
        .withMessage("Пароль обязателен")
        .isString()
        .withMessage("Пароль должен быть строкой")
];

export const createTaskValidator = [
    body("user")
        .exists({ checkFalsy: true })
        .withMessage("Имя пользователя обязателно")
        .isString()
        .withMessage("Имя пользователя должно быть строкой"),
    body("email")
        .isEmail()
        .withMessage("Неверный email"),
    body("desc")
        .exists()
        .withMessage("Текст обязателен")
        .isString()
        .withMessage("Текст должен быть строкой")
];

export const setDoneValidator = [
    body("done")
        .exists({ checkFalsy: true })
        .withMessage("Статус обязателен")
        .isBoolean()
        .withMessage("Статус должен быть булевым")
];

export const editTaskValidator = [
    body("desc")
        .exists()
        .withMessage("Текст обязателен")
        .isString()
        .withMessage("Текст должен быть строкой")
];
