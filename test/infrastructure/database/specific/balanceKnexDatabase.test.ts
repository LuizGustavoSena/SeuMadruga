import { CreateProps } from "@src/domain/models/account";
import BalanceKnexDatabase from "@src/infrastructure/database/specific/balanceKnex";
import { makeAccount } from "@test/data/mocks/insertAccount";

const sut: BalanceKnexDatabase = new BalanceKnexDatabase();

describe('BalanceKnexDatabase', () => {
    let auxiliarAccount: CreateProps & { id?: number } = makeAccount();

    beforeAll(async () => {
        await sut.db.migrate.latest();
        const response = await sut.db('accounts').insert(auxiliarAccount, 'id');

        auxiliarAccount.id = response[0].id;
    });

    afterAll(async () => {
        await sut.db.destroy();
    });

    test('Should be successful empty balance', async () => {
        const response = await sut.getBalanceByUserId(auxiliarAccount.user_id);

        expect(response).toHaveLength(0);
    });
});