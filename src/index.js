const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.connect(
  'mongodb+srv://edududuacardoso:YYuQz68yrpacC7t6@cluster0.siclqde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const LogSchema = new mongoose.Schema({
  commands: String,
  initialPosition: {
    x: Number,
    y: Number,
    direction: String,
  },
  rocket_id: String,
});

const Log = mongoose.model('Log', LogSchema);
const Rocket = mongoose.model('Rocket', RocketSchema);

const processCommands = (commands, initialPosition, bounds) => {
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

app.post('/rocket', async (req, res) => {
  const { name, size } = req.body;

  const rocketFind = await Rocket.find();

  if (rocketFind.length === 1) {
    console.log(
      `O Rocket ${rocketFind[0].name} ainda não finalizou o mapeamento`
    );
    return res.status(400).json({
      message: `O Rocket ${rocketFind[0].name} ainda não finalizou o mapeamento`,
    });
  }

  const rocket = new Rocket({ name, size });
  await rocket.save();

  res.status(201).json(rocket);
});

app.get('/rocket-status', async (req, res) => {
  const rocketFind = await Rocket.find();
  if (rocketFind.length === 0) {
    return res.status(200).json({ exists: false });
  }
  return res.status(200).json({ exists: true, rocket: rocketFind[0] });
});

app.post('/commands', async (req, res) => {
  const { commands, initialPosition } = req.body;
  const bounds = { x: 4, y: 4 }; // Limites do retângulo

  const finalPosition = processCommands(commands, initialPosition, bounds);

  const rocketFind = await Rocket.find();

  if (rocketFind.length === 0) {
    return res.status(400).json({ message: 'No active rocket found' });
  }

  const log = new Log({
    commands,
    initialPosition,
    rocket_id: rocketFind[0]._id,
  });
  await log.save();

  // Check if rocket reached (4, 4) and delete from database
  if (finalPosition.x === 4 && finalPosition.y === 4) {
    await Rocket.deleteOne({ _id: rocketFind[0]._id });
  }

  res.json(finalPosition);
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
