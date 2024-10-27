// src/controllers/TaskController.ts
import { Controller, Post, Get, Put, Delete, Route, Body, Request } from 'tsoa';
import { TaskModel } from '../models/TaskModel';
import { CustomRequest } from '../types/customRequest';

@Route('tasks')
export class TaskController extends Controller {
    @Post()
    public async createTask(@Body() body: { title: string; description: string }, @Request() request: CustomRequest) {
        const userId = request.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return TaskModel.createTask(userId, body);
    }

    @Get()
    public async getUserTasks(@Request() request: CustomRequest) {
        const userId = request.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return TaskModel.getTasksByUserId(userId);
    }

    @Put('{taskId}')
    public async updateTask(taskId: number, @Body() body: { title?: string; description?: string }, @Request() request: CustomRequest) {
        const userId = request.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return TaskModel.updateTask(taskId, userId, body);
    }

    @Get('{taskId}')
    public async getTaskById(taskId: number, @Request() request: CustomRequest) {
        const userId = request.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return TaskModel.getTaskById(taskId, userId);
    }

    @Delete('{taskId}')
    public async deleteTask(taskId: number, @Request() request: CustomRequest) {
        const userId = request.user?.id;
        if (!userId) {
            throw new Error('User not authenticated');
        }
        return TaskModel.deleteTask(taskId, userId);
    }
}
