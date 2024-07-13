import mongoose from 'mongoose';
import { LogModel } from './log.model';
import { Log } from '../../../../domain/log/entity/log';
import LogRepository from './log.repository';
import dotenv from 'dotenv';

dotenv.config();

let initialPosition = {
  x: 1,
  y: 1,
  direction: 'N',
};

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
describe('Log repository test', () => {
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
    await LogModel.deleteMany({});
  });

  it('should create a log', async () => {
    const logRepository = new LogRepository();

    const log = new Log('LRLRLRLR', initialPosition, 'id');

    await logRepository.create(log);

    const logModel = await LogModel.findOne({
      _id: log.id,
    });

    expect(logModel).toBeTruthy();

    expect(logModel?.toJSON()).toEqual({
      _id: expect.any(String),
      commands: log.commands,
      initialPosition: log.initialPosition,
      rocket_id: expect.any(String),
      __v: 0,
    });
  });

  it('should throw an error when log is not found', async () => {
    const logRepository = new LogRepository();

    await expect(async () => {
      await logRepository.find('456ABC');
    }).rejects.toThrow('log not found');
  });
});
