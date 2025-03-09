import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

const app = express();

app.use(express.json());
app.use(cors());

// all application routes:
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

// this is  just test:
app.get('/', (req: Request, res: Response) => {
  res.send(req);
});

export default app;
