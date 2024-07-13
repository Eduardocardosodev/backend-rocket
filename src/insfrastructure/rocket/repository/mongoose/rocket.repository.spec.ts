import mongoose from 'mongoose';
import { RocketModel } from './rocket.model';
import RocketRepository from './rocket.repository';
import { Rocket } from '../../../../domain/rocket/entity/rocket';
import dotenv from 'dotenv';

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
describe('Rocket repository test', () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      );
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  });

  afterEach(async () => {
    await RocketModel.deleteMany({});
  });

  it('should create a rocket', async () => {
    const rocketRepository = new RocketRepository();

    const rocket = new Rocket('b2l2', 1);

    await rocketRepository.create(rocket);

    const rocketModel = await RocketModel.findOne({
      _id: rocket.id,
    });

    expect(rocketModel).toBeTruthy();

    expect(rocketModel?.toJSON()).toEqual({
      _id: expect.any(String),
      name: rocket.name,
      size: rocket.size,
      __v: 0,
    });
  });

  it('should throw an error when rocket is not found', async () => {
    const rocketRepository = new RocketRepository();

    await expect(async () => {
      await rocketRepository.find('456ABC');
    }).rejects.toThrow('rocket not found');
  });
});
