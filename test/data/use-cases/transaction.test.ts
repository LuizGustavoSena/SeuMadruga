import { faker } from '@faker-js/faker/.';
import TransactionService from '@src/data/use-cases/transaction';
import { makeTransaction } from '../../domain/mocks/insertTransaction';
import TransactionDatabaseSpy from '../mocks/transactionDatabaseSpy';

type Props = {
    sut: TransactionService;
    database: TransactionDatabaseSpy;
}

const makeSut = (): Props => {
    const database = new TransactionDatabaseSpy();
    const sut = new TransactionService(database);

    return {
        sut,
        database
    }
}

describe('Transaction', () => {
    test('Should be empty list transaction', async () => {
        const { sut } = makeSut();

        const response = await sut.find({ user_id: faker.number.int() });

        expect(response).toHaveLength(0);
    });

    test('Should be successful create a transaction without date', async () => {
        const { sut, database } = makeSut();

        const transaction = makeTransaction();

        delete transaction.date;

        const response = await sut.create(transaction);

        expect(response.acc_id).toBe(transaction.acc_id);
        expect(response.ammount).toBe(transaction.ammount);
        expect(response.description).toBe(transaction.description);
        expect(response.status).toBe(transaction.status);
        expect(response.transfer_id).toBe(transaction.transfer_id);
        expect(response.type).toBe(transaction.type);
        expect(response).toHaveProperty('id');
        expect(response.date).toBe(database.content[0].date);
    });

    test('Should successful get transaction by id', async () => {
        const { sut, database } = makeSut();

        const id = faker.number.int();
        const transaction = makeTransaction()

        database.content.push({
            ...transaction,
            id
        });

        const response = await sut.findById(id);

        expect(response).toEqual({ ...transaction, id });
    });

    test('Should successful update transaction by id', async () => {
        const { sut, database } = makeSut();

        const id = faker.number.int();
        const transaction = makeTransaction()

        database.content.push({
            ...makeTransaction(),
            id
        });

        const response = await sut.updateById(id, transaction);

        expect(response).toEqual({ ...transaction, id });
    });

    test('Should successful delete transaction by id', async () => {
        const { sut, database } = makeSut();

        const id = faker.number.int();

        database.content.push({
            ...makeTransaction(),
            id
        });

        await sut.deleteById(id);

        expect(database.content).toHaveLength(0);
    });
});