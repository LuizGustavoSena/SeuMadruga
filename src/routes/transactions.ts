import TransactionService from '@src/services/transaction';
import express, { Request, Response } from 'express';

const transactionService = new TransactionService();

module.exports = () => {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const response = await transactionService.find({
                user_id: req.user.id
            });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    return router;
}