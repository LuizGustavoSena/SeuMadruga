import { faker } from '@faker-js/faker/.';
import TransactionService from '@src/data/use-cases/transaction';
import { makeTransaction } from '../mocks/insertTransaction';
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

    // test('Should error get transaction by another user', async () => {
    //     const transaction = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Error transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     const response = await request.get(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[1].token}`);

    //     expect(response.status).toBe(403);
    //     expect(response.body.error).toContain('não pertence');
    // });

    // test('Should successful update transaction by id', async () => {
    //     const transaction = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Successful update transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     const response = await request.put(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({ description: 'Updated transaction' });

    //     expect(response.status).toBe(200);
    //     expect(response.body.description).not.toBe(transaction);
    //     expect(response.body.id).toBe(transaction.body.id);
    // });

    // test('Should error update transaction by another user', async () => {
    //     const transaction = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Error update transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     const response = await request.put(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[1].token}`)
    //         .send({ description: 'Updated transaction' });

    //     expect(response.status).toBe(403);
    //     expect(response.body.error).toContain('não pertence');
    // });

    // test('Should successful delete transaction by id', async () => {
    //     const transaction = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Successful update transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     const response = await request.delete(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({ description: 'Delete transaction' });

    //     const responseGet = await request.get(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[0].token}`);

    //     expect(response.status).toBe(200);
    //     expect(responseGet.status).toBe(404);
    // });

    // test('Should error delete transaction by another user', async () => {
    //     const transaction = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Error update transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     const response = await request.delete(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[1].token}`)
    //         .send({ description: 'Updated transaction' });

    //     const responseGet = await request.get(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[0].token}`);

    //     expect(response.status).toBe(403);
    //     expect(responseGet.status).toBe(200);
    //     expect(responseGet.body.id).toBe(transaction.body.id);
    // });
});