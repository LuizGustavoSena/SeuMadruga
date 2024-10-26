import { Request, Response } from 'express';
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

module.exports = () => {
    const findAll = async (req: Request, res: Response) => {
        try {
            const users = await db.select('id', 'name', 'email').from('users');

            res.status(users.length = 0 ? 204 : 200).send(users.filter(el => el != null));
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
        }
    };

    const create = async (req: Request, res: Response) => {
        try {
            const response = db('users').insert(req.body);

            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
        }
    };

    return { findAll, create };
}