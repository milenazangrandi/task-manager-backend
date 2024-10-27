import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import { connectDB } from './config/db';
import { RegisterRoutes } from './routes/routes'; // Import generated routes
import authMiddleware from './middleware/authMiddleware'; // Ensure you have the JWT verification middleware

import taskRoutes from './routes/taskRoutes'; // Import task routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // Set to true if using HTTPS
    })
);

// Database connection
connectDB();

// Use the TSOA-generated routes
RegisterRoutes(app);

//Register task routes
app.use('/tasks', authMiddleware, taskRoutes); // Use your task routes with JWT middleware

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default server;
