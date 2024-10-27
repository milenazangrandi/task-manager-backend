// src/types/express.d.ts
import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: { id: number; email: string }; // Adjust the type as per your user object
        }
    }
}
