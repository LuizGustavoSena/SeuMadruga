import { getBalanceByUserIdResponse } from '@src/domain/models/balance';
import { BalanceDatabase } from '@src/infrastructure/models/balanceDatabase';

export default class BalanceService {
    constructor(
        private readonly db: BalanceDatabase
    ) { };

    async getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]> {
        const response = await this.db.getBalanceByUserId(userId);

        return response;
    }
}