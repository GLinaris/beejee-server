import jwt from 'jsonwebtoken';

export function jwtMw(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Ошибка авторизации' });
        }
        jwt.verify(token, process.env.AUTH_SECRET_KEY);
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Ошибка авторизации' });
    }
}
