import BalanceService from '@src/data/use-cases/balance';
import { Request, Response } from 'express';

export default class BalanceController {
    constructor(
        private balanceService: BalanceService
    ) { };

    async getBalance(req: Request, res: Response) {
        try {
            const response = await this.balanceService.getBalanceByUserId(req.user.id);

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error: any) {
            res.status(500).send();
        }
    }
}