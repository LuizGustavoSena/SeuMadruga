import { Request, Response } from 'express';
import { ZodError } from 'zod';
import Validation from '../domain/validations';
import AccountService from '../services/account';

const account = new AccountService();

module.exports = () => {
    const create = async (req: Request, res: Response) => {
        try {
            Validation.createAccount(req.body);

            const response = await account.create(req.body);

            res.status(201).send(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    };

    const getAll = async (req: Request, res: Response) => {
        try {
            const response = await account.getAll();

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    }

    const getById = async (req: Request, res: Response) => {
        try {
            const response = await account.getById(Number(req.params.id));

            res.status(response ? 200 : 404).send(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    }

    const update = async (req: Request, res: Response) => {
        try {
            const response = await account.update({
                id: Number(req.params.id),
                name: req.body.name
            });

            res.status(200).send(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    }

    const deleteById = async (req: Request, res: Response) => {
        try {
            await account.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error) {
            res.status(400).json({ error: 'Database error' });

        }
    }

    return { create, getAll, getById, update, deleteById };
}