import request from 'supertest';
import server from '../server';
import { closeDB } from '../config/db';

let token: string;

describe('Task Routes Tests', () => {
    beforeAll(async () => {
        const response = await request(server)
            .post('/auth/login') // Assuming you have a login endpoint
            .send({ email: 'dia@example.com', password: 'userpassword' }); // Use valid credentials

        if (response.status !== 200) {
            throw new Error('Login failed!'); // Ensure we know if login fails
        }

        token = response.body.token; // Adjust based on your response structure
        console.log(token);
    });

    afterAll(async () => {
        await closeDB(); // Close the database connection after all tests are done
        await server.close();
    });

    it('should create a task', async () => {
        const newTask = { title: 'Test Task', description: 'Task Description' };

        const response = await request(server)
            .post('/tasks')
            .set('Authorization', `Bearer ${token}`) // Simulate user authorization if needed
            .send(newTask);

        expect(response.status).toBe(201); // Expect HTTP status 201 for created
        expect(response.body).toEqual({ id: expect.any(Number), ...newTask }); // Adjust based on your response structure
    });
});
