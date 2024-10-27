// src/middleware/authMiddleware.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '../types/customRequest'; // Adjust path if necessary

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the token from the header

    if (!token) {
        // Instead of returning a Response object, call next() with an error
        res.status(401).json({ message: 'User not authenticated' });
        return;
    }

    jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Attach the decoded token to the request object
        req.user = decoded as { id: number; email: string };
        next(); // Call the next middleware/route handler
    });
};

export default authMiddleware;
