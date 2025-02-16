import { BalanceDatabase } from '@src/data/protocols/database/specif/balanceDatabase';
import { getBalanceByUserIdResponse } from '@src/domain/models/balance';
import { Balance } from '@src/domain/use-cases/balance';

export default class BalanceService implements Balance {
    constructor(
        private readonly db: BalanceDatabase
    ) { };

    async getBalanceByUserId(userId: number): Promise<getBalanceByUserIdResponse[]> {
        const response = await this.db.getBalanceByUserId(userId);

        return response;
    }
}