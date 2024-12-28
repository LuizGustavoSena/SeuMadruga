import BalanceService from '@src/services/balance';
import express, { Request, Response } from 'express';

const balanceService = new BalanceService();

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