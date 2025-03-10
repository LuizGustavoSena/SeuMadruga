import BalanceService from '@src/data/use-cases/balance';
import { NextFunction, Request, Response } from 'express';

export default class BalanceController {
    constructor(
        private balanceService: BalanceService
    ) { };

    async getBalance(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.balanceService.getBalanceByUserId(req.user.id);

            res.status(response.length > 0 ? 200 : 204).send(response);
        } catch (error: any) {
            next(error);
        }
    }
}