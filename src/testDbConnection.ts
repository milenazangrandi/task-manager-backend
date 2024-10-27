import dotenv from 'dotenv';
import { connectDB, sql } from './config/db'; // Import the connectDB function and sql

dotenv.config(); // Load environment variables

async function testConnection() {
    let connection; // Variable to hold the connection

    try {
        connection = await connectDB(); // Use the existing connectDB function
        const result = await connection.request().query('SELECT 1 AS test;'); // Execute a simple query
        console.log('Database connection successful:', result.recordset);
    } catch (error) {
        console.error('Database connection failed:', error); // Log any errors
    } finally {
        if (connection) {
            try {
                await connection.close(); // Close the connection when done
                console.log('Connection closed.');
            } catch (closeError) {
                console.error('Error closing the connection:', closeError);
            }
        }
    }
}

testConnection(); // Call the test function
