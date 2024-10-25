import { Request, Response } from 'express';
import knex from 'knex';
import config from "../../knexfile";

const db = knex(config);

module.exports = () => {
    const findAll = async (req: Request, res: Response) => {
        try {
            const users = await db('users').select();

            res.status(users.length = 0 ? 204 : 200).json(users);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
        }
    };

    const create = async (req: Request, res: Response) => {
        try {
            const response = db('users').insert(req.body, '*');

            res.status(201).json(response);
        } catch (error) {
            res.status(400).json({ error: 'Database error' });
        }
    };

    return { findAll, create };
}