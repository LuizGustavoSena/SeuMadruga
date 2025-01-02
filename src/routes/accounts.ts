import TransactionService from '@src/services/transaction';
import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import Validation from '../domain/validations';
import AccountService from '../services/account';

const serviceTransaction = new TransactionService();
const serviceAccount = new AccountService(serviceTransaction);

module.exports = () => {
    const router = express.Router();

    router.param('id', async (req: Request, res: Response, next: NextFunction) => {
        const account = await serviceAccount.getByFilter({ id: Number(req.params.id) });

        if (account.length === 0 ||
            (account.length > 0 && account.find(el => el.user_id === req.user.id))
        ) {
            next();
            return;
        }

        res.status(403).json({ error: 'Essa conta não pertence a esse usuário' });
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            Validation.createOrUpdateAccount(req.body);

            const response = await serviceAccount.create({ ...req.body, user_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    });

    router.get('/', async (req: Request, res: Response) => {
        try {
            const response = await serviceAccount.getByFilter({ user_id: req.user.id });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const response = await serviceAccount.getByFilter({ id: Number(req.params.id) });

            res.status(response.length > 0 ? 200 : 404).send(response[0]);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            Validation.createOrUpdateAccount(req.body);

            const response = await serviceAccount.update({
                id: Number(req.params.id),
                name: req.body.name
            });

            res.status(200).send(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            await serviceAccount.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });

        }
    });

    return router;
}