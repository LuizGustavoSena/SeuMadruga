import { faker } from '@faker-js/faker/.';
import AccountService from '@src/data/use-cases/account';
import TransactionService from '@src/data/use-cases/transaction';
import { ExistingAccountError } from '@src/domain/error/existingAccount';
import { ExistingTransactionsError } from '@src/domain/error/existingTransactions';
import DatabaseSpy from '../mocks/databaseSpy';
import { makeAccount } from '../mocks/insertAccount';
import { makeTransaction } from '../mocks/insertTransaction';
import TransactionDatabaseSpy from '../mocks/transactionDatabaseSpy';

type Props = {
    sut: AccountService;
    databaseTransaction: TransactionDatabaseSpy;
    database: DatabaseSpy;
    transactionService: TransactionService;
}

const makeSut = (): Props => {
    const databaseTransaction = new TransactionDatabaseSpy();
    const transactionService = new TransactionService(databaseTransaction);
    const database = new DatabaseSpy();
    const sut = new AccountService(transactionService, database);

    return {
        sut,
        databaseTransaction,
        database,
        transactionService
    }
}

describe('Account', () => {
    test('Should be create a successful account', async () => {
        const { sut } = makeSut();

        const account = makeAccount();

        const response = await sut.create(account);

        expect(response.name).toBe(account.name);
        expect(response.user_id).toBe(account.user_id);
        expect(response).toHaveProperty('id');
    });

    test('Should be error when create account with the same name', async () => {
        const { database, sut } = makeSut();

        const name = faker.person.fullName();
        const user_id = faker.number.int();

        database.content.push({
            ...makeAccount({ name, user_id }),
            id: faker.number.int()
        });

        const promise = sut.create(makeAccount({ name, user_id }));

        await expect(promise).rejects.toThrow(new ExistingAccountError());
    });

    test('Should be get by filter account successful', async () => {
        const { database, sut } = makeSut();

        const account = makeAccount();
        const id = faker.number.int();

        database.content.push({
            ...account,
            id
        });

        const response = await sut.getByFilter({ id });

        expect(response[0].name).toBe(account.name);
        expect(response[0].user_id).toBe(account.user_id);
        expect(response[0].id).toBe(id);
    });

    test('Should be update a successful account', async () => {
        const { database, sut } = makeSut();

        const name = faker.person.fullName();
        const account = makeAccount();
        const id = faker.number.int();

        database.content.push({
            ...account,
            id
        });

        const response = await sut.update({
            id,
            name
        });

        expect(response.name).toBe(name);
        expect(response.user_id).toBe(account.user_id);
        expect(response.id).toBe(id);
    });

    test('Should be delete by id account successful', async () => {
        const { database, sut } = makeSut();

        const account = makeAccount();
        const id = faker.number.int();

        database.content.push({
            ...account,
            id
        });

        await sut.deleteById(id);

        expect(database.content).toHaveLength(0);
    });

    test('Should don`t delete account with one or multiple transactions', async () => {
        const { database, databaseTransaction, sut } = makeSut();

        const user_id = faker.number.int();
        const id = faker.number.int();
        const account = makeAccount({ user_id });

        database.content.push({
            ...account,
            id
        });

        databaseTransaction.transactions = [{
            ...makeTransaction({ acc_id: id }),
            id: faker.number.int()
        }];

        const promise = sut.deleteById(id);

        await expect(promise).rejects.toThrow(new ExistingTransactionsError());
        expect(databaseTransaction.params.user_id).toBe(user_id);
        expect(database.content).toHaveLength(1);
    });
})