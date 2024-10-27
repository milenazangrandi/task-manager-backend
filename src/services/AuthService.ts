import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserModel } from '../models/UserModel';

dotenv.config();

export class AuthService {
    static async register(email: string, password: string) {
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await UserModel.create({ email, password: hashedPassword });
        return newUser;
    }

    static async login(email: string, password: string) {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'defaultsecret', {
            expiresIn: process.env.JWT_EXPIRY || '1d',
        });

        return { token, user };
    }
}
