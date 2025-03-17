import { faker } from "@faker-js/faker/.";
import { CreateProps } from "@src/domain/models/account";
import { Type } from "@src/domain/models/transaction";
import BalanceKnexDatabase from "@src/infrastructure/database/specific/balanceKnex";
import { makeAccount } from "@test/data/mocks/insertAccount";
import { makeTransaction } from "@test/data/mocks/insertTransaction";

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

    test('Should be successful balance', async () => {
        const transaction = makeTransaction({
            acc_id: auxiliarAccount.id,
            date: faker.date.past(),
            type: Type.INPUT,
            ammount: faker.number.float(),
            status: true
        });

        const transaction2 = makeTransaction({
            acc_id: auxiliarAccount.id,
            date: faker.date.past(),
            type: Type.INPUT,
            ammount: faker.number.float(),
            status: true
        });

        await sut.db('transactions').insert(transaction);
        await sut.db('transactions').insert(transaction2);

        const response = await sut.getBalanceByUserId(auxiliarAccount.user_id);

        expect(response).toHaveLength(1);
        expect(response[0].sum).toBe(transaction.ammount + transaction2.ammount);
    });
});