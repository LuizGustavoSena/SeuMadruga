import { UserModel } from '@src/models/user';
import { Express, Request, Response } from 'express';
import UserService from '../services/user';

const user = new UserService();

module.exports = (app: Express) => {
    const findAll = async (req: Request, res: Response) => {
        try {
            const users = await user.findAll();

            res.status(users.length = 0 ? 204 : 200).send(users.filter((el: UserModel) => el != null));
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
        }
    };

    const create = async (req: Request, res: Response) => {
        try {
            const response = await user.save(req.body);

            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
        }
    };

    return { findAll, create };
}