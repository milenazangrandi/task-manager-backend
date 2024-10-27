import { TaskModel } from '../models/TaskModel';

jest.mock('../config/db');

describe('TaskModel Tests', () => {
    const userId = 1;
    const taskData = { title: 'Test Task', description: 'Task Description' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a task', async () => {
        const createTaskSpy = jest.spyOn(TaskModel, 'createTask');
        createTaskSpy.mockResolvedValueOnce({ id: 1, ...taskData });

        const result = await TaskModel.createTask(userId, taskData);

        expect(result).toEqual({ id: 1, ...taskData });
        expect(createTaskSpy).toHaveBeenCalledWith(userId, taskData);
    });
});
