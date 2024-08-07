import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();
const port: number = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`Server is listening on port ${port} `);
});
