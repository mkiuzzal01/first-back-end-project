import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';

const app = express();

app.use(express.json());
app.use(cors());

// all application routes:
app.use('/api/v1/students', StudentRoutes);

// this is  just test:
app.get('/', (req: Request, res: Response) => {
  res.send(req);
});

export default app;
