import { BalanceDatabase } from '@src/data/protocols/database/specif/balanceDatabase';
import { getBalanceByUserIdResponse } from '@src/domain/models/balance';

export default class BalanceService {
    constructor(
        private readonly db: BalanceDatabase
    ) { };

    async getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]> {
        const response = await this.db.getBalanceByUserId(userId);

        return response;
    }
}