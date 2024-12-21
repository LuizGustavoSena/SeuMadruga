import Validation from '@src/domain/validations';
import TransferService from '@src/services/transfer';
import express, { Request, Response } from 'express';
import { ZodError } from 'zod';

const transferService = new TransferService();

module.exports = () => {
    const router = express.Router();

    router.get('/', async (req: Request, res: Response) => {
        try {
            const response = await transferService.find({ user_id: req.user.id });

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    router.post('/', async (req: Request, res: Response) => {
        try {
            Validation.createTransfer(req.body);

            const response = await transferService.create({ ...req.body, user_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    });

    return router;
}