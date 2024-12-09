import Validation from '@src/domain/validations';
import TransactionService from '@src/services/transaction';
import express, { Request, Response } from 'express';
import { ZodError } from 'zod';

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

    router.post('/', async (req: Request, res: Response) => {
        try {
            Validation.createTransaction(req.body);

            const response = await transactionService.create({ ...req.body, acc_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const response = await transactionService.findById(Number(req.params.id));

            res.status(response ? 200 : 404).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    return router;
}