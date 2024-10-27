// src/routes/taskRoutes.ts

import { Router, Request, Response } from 'express'; // Import Request and Response types
import { TaskController } from '../controllers/TaskController';

const router = Router();
const taskController = new TaskController(); // Create an instance of TaskController

// Create a new task
router.post('/', async (req: Request, res: Response) => {
    try {
        const result = await taskController.createTask(req.body, req);
        res.status(201).json(result);
    } catch (error: unknown) {
        // Explicitly specify the type of error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// Get all tasks for the authenticated user
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await taskController.getUserTasks(req);
        res.status(200).json(result);
    } catch (error: unknown) {
        // Explicitly specify the type of error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// Get a specific task by ID
router.get('/:taskId', async (req: Request, res: Response) => {
    try {
        const result = await taskController.getTaskById(Number(req.params.taskId), req);
        res.status(200).json(result);
    } catch (error: unknown) {
        // Explicitly specify the type of error
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// Update a specific task by ID
router.put('/:taskId', async (req: Request, res: Response) => {
    try {
        const result = await taskController.updateTask(Number(req.params.taskId), req.body, req);
        res.status(200).json(result);
    } catch (error: unknown) {
        // Explicitly specify the type of error
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

// Delete a specific task by ID
router.delete('/:taskId', async (req: Request, res: Response) => {
    try {
        await taskController.deleteTask(Number(req.params.taskId), req);
        res.status(204).send();
    } catch (error: unknown) {
        // Explicitly specify the type of error
        if (error instanceof Error) {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

export default router;
