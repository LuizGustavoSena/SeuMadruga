import { UserModel } from '@src/domain/models/user';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import Validation from '../domain/validations';
import UserService from '../services/user';

const user = new UserService();

module.exports = () => {
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
            Validation.createUser(req.body);

            const existEmail = await user.findByEmail(req.body.email);

            if (existEmail.length > 0)
                throw new Error('Email já existente');

            const response = await user.save(req.body);

            res.status(201).json(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    };

    return { findAll, create };
}