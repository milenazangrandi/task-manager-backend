import sql from 'mssql';
import { connectDB } from '../config/db';
import { User } from '../types/User';

export class UserModel {
    static async create(user: { email: string; password: string }): Promise<User> {
        const db = await connectDB();
        const result = await db
            .request()
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, user.password)
            .query('INSERT INTO users (email, password) OUTPUT INSERTED.* VALUES (@email, @password)');

        return result.recordset[0];
    }

    static async findByEmail(email: string): Promise<User | null> {
        const db = await connectDB();
        const result = await db.request().input('email', sql.NVarChar, email).query('SELECT * FROM users WHERE email = @email');

        return result.recordset[0] || null;
    }

    static async findById(id: number): Promise<User | null> {
        const db = await connectDB();
        const result = await db.request().input('id', sql.Int, id).query('SELECT * FROM users WHERE id = @id');

        return result.recordset[0] || null;
    }
}
