import { CreateProps } from "@src/domain/models/account";
import TransactionKnexDatabase from "@src/infrastructure/database/specific/transactionKnex";
import { makeAccount } from "@test/data/mocks/insertAccount";

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
});