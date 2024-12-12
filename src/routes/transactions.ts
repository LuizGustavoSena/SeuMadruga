import Validation from '@src/domain/validations';
import AccountService from '@src/services/account';
import TransactionService from '@src/services/transaction';
import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const transactionService = new TransactionService();
const serviceAccount = new AccountService();

module.exports = () => {
    const router = express.Router();

    router.param('id', async (req: Request, res: Response, next: NextFunction) => {
        const transaction = await transactionService.findById(Number(req.params.id));

        if (!transaction) {
            res.status(404).send();

            return;
        }

        if (transaction.acc_id !== req.user.id) {
            res.status(403).send({ error: 'Essa transação não pertence a essa conta' });

            return;
        }

        next();
    });


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

            res.status(200).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const response = await transactionService.updateById(Number(req.params.id), req.body);

            res.status(200).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            await transactionService.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    return router;
}