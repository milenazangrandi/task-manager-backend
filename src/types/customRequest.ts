// src/types/customRequest.ts
import { Request } from 'express';

interface JwtPayload {
    id: number;
    email: string;
}

export interface CustomRequest extends Request {
    user?: JwtPayload; // Optional user property
}
