import { Request, Response } from 'express';

module.exports = () => {
    const findAll = (req: Request, res: Response) => {
        const users = [
            {
                name: 'John Doe',
                email: 'johndoe@email.com'
            }
        ]
        res.status(200).json(users);
    };

    const create = (req: Request, res: Response) => {
        res.status(201).json(req.body);
    };

    return { findAll, create };
}