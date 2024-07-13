import mongoose from 'mongoose';
import request from 'supertest';
import { app, connectDb } from '../app';
import { Rocket } from '../../../domain/rocket/entity/rocket';
describe('E2E test for rocket', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a rocket', async () => {
    const rocketExists = await request(app).get('/rocket').send();
    const rockets = rocketExists.body;
    let rocketId: string;

    if (!rockets.message) {
      rockets.map((rocket: any) => {
        rocketId = rocket.id;
      });
    }

    if (rocketExists.body.length === 1) {
      rocketExists.body.map(async (rocket: Rocket) => {
        await request(app).delete(`/rocket/${rocketId}`);
      });
    }

    const response = await request(app).post('/rocket').send({
      name: 'B2L2',
      size: 1,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('B2L2');
    expect(response.body.size).toBe(1);
  });

  it('should not create rocket', async () => {
    const response = await request(app).post('/rocket').send({
      name: 'B2L2',
      size: null,
    });
    expect(response.status).toBe(500);
  });
});
