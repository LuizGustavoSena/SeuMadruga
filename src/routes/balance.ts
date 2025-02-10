import BalanceService from '@src/data/use-cases/balance';
import BalanceKnexDatabase from '@src/infrastructure/database/specific/balanceKnex';
import express, { Request, Response } from 'express';

const balanceService = new BalanceService(new BalanceKnexDatabase());

module.exports = () => {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const response = await balanceService.getBalanceByUserId(req.user.id);

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    return router;
}