import express, { Request, Response } from 'express';
import { ZodError } from 'zod';
import Validation from '../domain/validations';
import AccountService from '../services/account';

const account = new AccountService();

module.exports = () => {
    const router = express.Router();

    router.post('/', async (req: Request, res: Response) => {
        try {
            Validation.createAccount(req.body);

            const response = await account.create({ ...req.body, user_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    });

    router.get('/', async (req: Request, res: Response) => {
        try {
            const response = await account.getByFilter({ user_id: req.user.id });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const response = await account.getByFilter({ id: Number(req.params.id) });

            res.status(response.length ? 200 : 404).send(response[0]);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const response = await account.update({
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
            await account.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    });

    return router;
}