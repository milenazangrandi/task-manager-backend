import dotenv from 'dotenv';
import sql, { config as SQLConfig, ConnectionPool } from 'mssql';

dotenv.config();

const dbConfig: SQLConfig = {
    user: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    server: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '1433', 10),
    database: process.env.DB_NAME as string,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

let connectionPool: ConnectionPool | null = null; // Initialize as null

export const connectDB = async () => {
    try {
        if (connectionPool) {
            await connectionPool.close();
        }
        connectionPool = await sql.connect(dbConfig);
        console.log('Connected to the database!');
        return connectionPool;
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

// Close the connection pool
export const closeDB = async () => {
    try {
        if (connectionPool) {
            await connectionPool.close(); // Close the pool only if it exists
            connectionPool = null; // Set it to null after closing
            console.log('Database connection closed.');
        }
    } catch (err) {
        console.error('Error closing the database connection:', err);
    }
};

export { sql, connectionPool };
