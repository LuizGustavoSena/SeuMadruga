import Validation from '@src/domain/validations';
import KnexDatabase from '@src/infrastructure/database/knex';
import TransactionKnexDatabase from '@src/infrastructure/database/specific/transactionKnex';
import TransferKnexDatabase from '@src/infrastructure/database/specific/transferKnex';
import AccountService from '@src/services/account';
import TransactionService from '@src/services/transaction';
import TransferService from '@src/services/transfer';
import express, { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const transferService = new TransferService(new TransferKnexDatabase(new TransactionKnexDatabase()));
const serviceTransaction = new TransactionService(new TransactionKnexDatabase());
const serviceAccount = new AccountService(serviceTransaction, new KnexDatabase('accounts'));

module.exports = () => {
    const router = express.Router();

    router.param('id', async (req: Request, res: Response, next: NextFunction) => {
        const transfer = await transferService.find({ id: Number(req.params.id) });

        if (transfer.length === 0) {
            res.status(404).send();

            return;
        }


        if (transfer[0].user_id !== req.user.id) {
            res.status(403).send({ error: 'Essa transação não pertence a essa conta' });

            return;
        }

        next();
    });

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

            const accountOrigin = await serviceAccount.getByFilter({ id: req.body.acc_ori_id });

            if (accountOrigin.length === 0 || accountOrigin[0].user_id !== req.user.id)
                throw new Error('acc_ori_id não pertence a esse usuário');

            const accountDestiny = await serviceAccount.getByFilter({ id: req.body.acc_dest_id });

            if (accountDestiny.length === 0 || accountDestiny[0].user_id !== req.user.id)
                throw new Error('acc_dest_id não pertence a esse usuário');

            const response = await transferService.create({ ...req.body, user_id: req.user.id });

            res.status(201).send(response);
        } catch (error: any) {
            let message = error instanceof ZodError ? `${error.errors.map(el => el.message).join(', ')}` : error.message;

            res.status(400).json({ error: message });
        }
    });

    router.get('/:id', async (req: Request, res: Response) => {
        try {
            const response = await transferService.find({ id: Number(req.params.id) });

            res.status(200).send(response[0]);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    router.put('/:id', async (req: Request, res: Response) => {
        try {
            const response = await transferService.update({
                id: Number(req.params.id),
                data: req.body
            });

            res.status(200).send(response);
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
        try {
            await transferService.deleteById(Number(req.params.id));

            res.status(200).send();
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    });

    return router;
}