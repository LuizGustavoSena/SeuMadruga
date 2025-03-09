import authenticate from '@src/main/middlewares/protectedRouter';
import accountRoutes from '@src/main/routes/accountRoutes';
import authRoutes from '@src/main/routes/authRoutes';
import balanceRoutes from '@src/main/routes/BalanceRoutes';
import transactionRoutes from '@src/main/routes/transactionRoutes';
import transferRoutes from '@src/main/routes/transferRoutes';
import { json } from 'body-parser';
import express from 'express';

const app = express();
const protectedRouter = express.Router();

app.use(json());

app.use('/auth', authRoutes);

protectedRouter.use('/accounts', accountRoutes);
protectedRouter.use('/transactions', transactionRoutes);
protectedRouter.use('/transfers', transferRoutes);
protectedRouter.use('/balance', balanceRoutes);

app.use('/v1', authenticate(), protectedRouter);

export default app;