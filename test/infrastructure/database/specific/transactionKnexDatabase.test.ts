import { faker } from "@faker-js/faker/.";
import { CreateProps } from "@src/domain/models/account";
import TransactionKnexDatabase from "@src/infrastructure/database/specific/transactionKnex";
import { makeAccount } from "@test/domain/mocks/insertAccount";
import { makeTransaction } from "@test/domain/mocks/insertTransaction";

const sut: TransactionKnexDatabase = new TransactionKnexDatabase();

describe('TransactionKnexDatabase', () => {
    let auxiliarAccount: CreateProps & { id?: number } = makeAccount();

    beforeAll(async () => {
        await sut.db.migrate.latest();
        const response = await sut.db('accounts').insert(auxiliarAccount, 'id');

        auxiliarAccount.id = response[0].id;
    });

    afterAll(async () => {
        await sut.db.destroy();
    });

    test('Should be successful empty transaction', async () => {
        const response = await sut.findTransactions({ user_id: auxiliarAccount.user_id });

        expect(response).toHaveLength(0);
    });

    test('Should be successful transactions', async () => {
        const transaction = makeTransaction({ acc_id: auxiliarAccount.id });
        await sut.db('transactions').insert(transaction);

        const response = await sut.findTransactions({ user_id: auxiliarAccount.user_id });

        expect(response).toHaveLength(1);
    });

    test('Should be successful delete transaction by id', async () => {
        const transferId = faker.number.int();
        const transaction = await sut.db('transactions').insert(makeTransaction({ acc_id: auxiliarAccount.id, transfer_id: transferId }), 'id');

        await sut.deleteByTransferId(transferId);

        const response = await sut.getByFIlter({ id: transaction[0].id });

        expect(response).toHaveLength(0);
    });
});