import AccountService from '@src/services/account';
import { Request, Response } from 'express';

const account = new AccountService();

module.exports = () => {
    const create = async (req: Request, res: Response) => {
        try {
            const response = await account.create(req.body);

            res.status(201).send(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
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

    return { create, getAll };
}