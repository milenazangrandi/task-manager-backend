// src/controllers/AuthController.ts
import { Controller, Route, Post, Body } from 'tsoa';
import { AuthService } from '../services/AuthService';
import { User } from '../types/User';

@Route('auth') // Route decorator is required for TSOA
export class AuthController extends Controller {
    @Post('register')
    public async register(@Body() body: { email: string; password: string }): Promise<User> {
        const { email, password } = body;
        return AuthService.register(email, password);
    }

    @Post('login')
    public async login(@Body() body: { email: string; password: string }): Promise<{ token: string; user: User }> {
        const { email, password } = body;
        return AuthService.login(email, password);
    }
}
