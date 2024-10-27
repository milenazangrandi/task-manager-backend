import { sql } from '../config/db';

export class TaskModel {
    // Create a new task
    public static async createTask(userId: number, taskData: { title: string; description: string }) {
        const query = `
            INSERT INTO tasks (userId, title, description) 
            OUTPUT INSERTED.id
            VALUES (@userId, @title, @description);`;

        const request = new sql.Request();
        request.input('userId', sql.Int, userId);
        request.input('title', sql.VarChar(255), taskData.title);
        request.input('description', sql.Text, taskData.description);

        const result = await request.query(query);

        // Ensure there is at least one record in the result
        if (result.recordset.length === 0) {
            throw new Error('No task was created.');
        }

        return { id: result.recordset[0].id, ...taskData };
    }

    // Get all tasks for a specific user
    public static async getTasksByUserId(userId: number) {
        const query = `SELECT * FROM tasks WHERE userId = @userId;`;

        const request = new sql.Request();
        request.input('userId', sql.Int, userId);

        const result = await request.query(query);
        return result.recordset;
    }

    // Get a task by its ID for a specific user
    public static async getTaskById(taskId: number, userId: number) {
        const query = `SELECT * FROM tasks WHERE id = @taskId AND userId = @userId;`;

        const request = new sql.Request();
        request.input('taskId', sql.Int, taskId);
        request.input('userId', sql.Int, userId);

        const result = await request.query(query);

        if (result.recordset.length === 0) {
            throw new Error('Task not found or not authorized');
        }

        return result.recordset[0];
    }

    // Update an existing task
    public static async updateTask(taskId: number, userId: number, updateData: { title?: string; description?: string }) {
        const query = `
            UPDATE tasks 
            SET 
                title = COALESCE(@title, title), 
                description = COALESCE(@description, description)
            WHERE 
                id = @taskId AND userId = @userId;`;

        const request = new sql.Request();
        request.input('taskId', sql.Int, taskId);
        request.input('userId', sql.Int, userId);
        request.input('title', sql.VarChar(255), updateData.title || null);
        request.input('description', sql.Text, updateData.description || null);

        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            throw new Error('Task not found or not authorized to update');
        }

        return { message: 'Task updated successfully' };
    }

    // Delete a task
    public static async deleteTask(taskId: number, userId: number) {
        const query = `DELETE FROM tasks WHERE id = @taskId AND userId = @userId;`;

        const request = new sql.Request();
        request.input('taskId', sql.Int, taskId);
        request.input('userId', sql.Int, userId);

        const result = await request.query(query);

        if (result.rowsAffected[0] === 0) {
            throw new Error('Task not found or not authorized to delete');
        }

        return { message: 'Task deleted successfully' };
    }
}
