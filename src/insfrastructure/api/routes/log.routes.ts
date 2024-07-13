import express, { Request, Response } from 'express';
import CreateLogUseCase from '../../../usecases/log/create/create.log.usecase';
import LogRepository from '../../log/repository/mongoose/log.repository';
import ListRocketUseCase from '../../../usecases/rocket/list/list.rocket.usecase';
import RocketRepository from '../../rocket/repository/mongoose/rocket.repository';

export const logRoute = express.Router();

logRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateLogUseCase(new LogRepository());
  const usecaseRocket = new ListRocketUseCase(new RocketRepository());

  const outputListRocket = await usecaseRocket.execute();

  try {
    const logDto = {
      commands: req.body.commands,
      initialPosition: req.body.initialPosition,
      rocket_id: outputListRocket[0].id,
    };
    const output = await usecase.execute(logDto);

    res.status(201).json(output);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
