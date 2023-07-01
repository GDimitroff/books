import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import morgan from 'morgan';

import bookRouter from './routes/bookRoutes';
import userRouter from './routes/userRoutes';

dotenv.config();

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2) ROUTES
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

export default app;
