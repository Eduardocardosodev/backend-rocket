import express, { Request, Response } from 'express';
import CreateRocketUseCase from '../../../usecases/rocket/create/create.rocket.usecase';
import RocketRepository from '../../rocket/repository/mongoose/rocket.repository';
import ListRocketUseCase from '../../../usecases/rocket/list/list.rocket.usecase';
import DeleteRocketUseCase from '../../../usecases/rocket/delete/delete.rocket.usecase';
import { Log } from '../../../domain/log/entity/log';
import CreateLogUseCase from '../../../usecases/log/create/create.log.usecase';
import LogRepository from '../../log/repository/mongoose/log.repository';

export const rocketRoute = express.Router();

rocketRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new CreateRocketUseCase(new RocketRepository());

  try {
    const rocketDto = {
      name: req.body.name,
      size: req.body.size,
    };
    const output = await usecase.execute(rocketDto);

    res.status(201).json(output);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

rocketRoute.get('/', async (req: Request, res: Response) => {
  const usecase = new ListRocketUseCase(new RocketRepository());

  try {
    const output = await usecase.execute();
    return res.json(output);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

rocketRoute.get('/rocket-status', async (req: Request, res: Response) => {
  const usecase = new ListRocketUseCase(new RocketRepository());

  try {
    const output = await usecase.execute();

    if (output.length === 0) {
      return res.status(200).json({ exists: false });
    }
    return res.status(200).json({ exists: true, rocket: output[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

rocketRoute.delete('/:id', async (req: Request, res: Response) => {
  const usecase = new DeleteRocketUseCase(new RocketRepository());

  const { id } = req.params;

  try {
    const output = await usecase.execute({ id });
    return res.status(200).json(output);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

const processCommands = (
  commands: string,
  initialPosition: any,
  bounds: any
) => {
  let { x, y, direction } = initialPosition;
  const directions = ['N', 'E', 'S', 'W'];
  for (const command of commands) {
    if (command === 'L') {
      direction = directions[(directions.indexOf(direction) + 3) % 4];
    } else if (command === 'R') {
      direction = directions[(directions.indexOf(direction) + 1) % 4];
    } else if (command === 'M') {
      if (direction === 'N' && y < bounds.y) y++;
      if (direction === 'E' && x < bounds.x) x++;
      if (direction === 'S' && y > 0) y--;
      if (direction === 'W' && x > 0) x--;
    }
  }
  return { x, y, direction };
};

rocketRoute.post('/commands', async (req: Request, res: Response) => {
  const usecaseList = new ListRocketUseCase(new RocketRepository());
  const usecaseDelete = new DeleteRocketUseCase(new RocketRepository());
  const usecaseCreateLog = new CreateLogUseCase(new LogRepository());

  try {
    const { commands, initialPosition } = req.body;
    const bounds: any = { x: 4, y: 4 }; // Limites do retângulo

    const outputList = await usecaseList.execute();
    const finalPosition = processCommands(commands, initialPosition, bounds);

    const log = await usecaseCreateLog.execute({
      commands,
      initialPosition,
      rocket_id: outputList[0].id,
    });

    // Check if rocket reached (4, 4) and delete from database
    if (finalPosition.x === 4 && finalPosition.y === 4) {
      await usecaseDelete.execute({ id: outputList[0].id });
    }

    return res.status(200).json(finalPosition);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});
