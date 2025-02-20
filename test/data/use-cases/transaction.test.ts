import { faker } from '@faker-js/faker/.';
import TransactionService from '@src/data/use-cases/transaction';
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

    // test('Should be successful create a transaction', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Successful transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     expect(response.status).toBe(201);
    //     expect(response.body).toHaveProperty('id');
    // });

    // test('Should be error create a transaction with negative ammount on Input type', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: -100,
    //             description: 'Successful transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toContain('deve ser positivo');
    // });

    // test('Should be error create a transaction with positive ammount on Output type', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Successful transaction',
    //             type: Type.OUTPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toContain('deve ser negativo');
    // });

    // test('Should be error create a transaction without description', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             type: Type.OUTPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toContain('description deve ser preenchido');
    // });

    // test('Should be error create a transaction without ammount', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             description: 'Error transaction without ammount',
    //             type: Type.OUTPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toContain('ammount deve ser preenchido');
    // });

    // test('Should be error create a transaction without type or with incorrect type', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Error transaction without type or with incorrect type',
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toContain('type inválido');
    // });

    // test('Should be error create a transaction without acc_id', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Error transaction without type or with incorrect type',
    //             type: Type.INPUT
    //         });

    //     expect(response.status).toBe(400);
    //     expect(response.body.error).toContain('acc_id deve ser preenchido');
    // });

    // test('Should be error create a transaction with acc_id from another user', async () => {
    //     const response = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Error transaction without type or with incorrect type',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[1].id
    //         });

    //     expect(response.status).toBe(403);
    //     expect(response.body.error).toContain('Conta pertence a outro usuário');
    // });

    // test('Should don`t list another transaction account`s', async () => {
    //     const description = 'Don`t list another transaction account`s';

    //     await transactionService.create({
    //         acc_id: ACCOUNTS[0].id ?? 0,
    //         ammount: 100,
    //         description,
    //         type: Type.INPUT,
    //         status: true
    //     });

    //     await transactionService.create({
    //         acc_id: ACCOUNTS[1].id ?? 0,
    //         ammount: 100,
    //         description,
    //         type: Type.INPUT,
    //         status: true
    //     });

    //     const response = await request.get(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`);

    //     const filter = response.body.filter((el: FindResponse) => el.description === description);

    //     expect(response.status).toBe(200);
    //     expect(filter).toHaveLength(1);
    //     expect(filter[0].acc_id).toBe(ACCOUNTS[0].id);
    // });

    // test('Should successful get transaction by id', async () => {
    //     const transaction = await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USERS[0].token}`)
    //         .send({
    //             ammount: 100,
    //             description: 'Successful transaction',
    //             type: Type.INPUT,
    //             acc_id: ACCOUNTS[0].id
    //         });

    //     const response = await request.get(`${URL_TRANSACTION}/${transaction.body.id}`)
    //         .set('authorization', `JWT ${USERS[0].token}`);

    //     expect(response.status).toBe(200);
    //     expect(response.body.id).toBe(transaction.body.id);
    // });

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