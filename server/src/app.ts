import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import bookRouter from './routes/bookRoutes';
import userRouter from './routes/userRoutes';

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) ROUTES
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

export default app;
