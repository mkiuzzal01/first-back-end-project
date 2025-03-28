import express, { Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './utils/NotFound';
import router from './app/router';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['localhost:5173'] }));

// All application routes:
app.use('/api/v1/', router);

// This is  just test:
app.get('/', (req: Request, res: Response) => {
  Promise.reject();
  res.send(req);
});

// Global error handler
app.use(globalErrorHandler);

// Not found error
app.use(notFound);

export default app;
