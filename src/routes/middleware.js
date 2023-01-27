import jwt from 'jsonwebtoken';
import { User } from '../models/shared/user.js';

export const checkRole = (roles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization;
            const decoded = jwt.verify(token, 'secret');
            User.findByPk(decoded.id)
                .then(user => {
                    if (!user) {
                        return res.status(401).json({ message: 'User not found' });
                    }
                    if (!roles.includes(user.role)) {
                        return res.status(401).json({ message: 'Not authorized' });
                    }
                    next();
                })
                .catch(err => {
                    return res.status(401).json({ message: 'Token is not valid' });
                });
        } catch (error) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
    }
}