import { faker } from '@faker-js/faker/.';
import AccountService from '@src/data/use-cases/account';
import TransactionService from '@src/data/use-cases/transaction';
import { ExistingAccountError } from '@src/domain/error/existingAccount';
import DatabaseSpy from '../mocks/databaseSpy';
import { makeAccount } from '../mocks/insertAccount';
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

    // test('Should don`t show another user_id account', async () => {
    //     const account = { name: 'NameTheUserOne' };

    //     const response = await request.post(URL)
    //         .set('authorization', `JWT ${USER.token}`)
    //         .send(account);

    //     const responseAnotherUser = await request.get(`${URL}/${response.body.id}`)
    //         .set('authorization', `JWT ${ANOTHER_USER.token}`);

    //     expect(responseAnotherUser.status).toBe(403);
    //     expect(responseAnotherUser.body).toHaveProperty('error');
    //     expect(responseAnotherUser.body.error).toContain('não pertence');
    // });

    // test('Should don`t update another user_id account', async () => {
    //     const account = { name: 'NameToUpdateTheUserOne' };

    //     const response = await request.post(URL)
    //         .set('authorization', `JWT ${USER.token}`)
    //         .send(account);

    //     const responseAnotherUser = await request.put(`${URL}/${response.body.id}`)
    //         .set('authorization', `JWT ${ANOTHER_USER.token}`)
    //         .send({ name: 'AlterName' });

    //     expect(responseAnotherUser.status).toBe(403);
    //     expect(responseAnotherUser.body).toHaveProperty('error');
    //     expect(responseAnotherUser.body.error).toContain('não pertence');
    // });

    // test('Should don`t delete another user_id account', async () => {
    //     const account = { name: 'NameToDeleteTheUserOne' };

    //     const response = await request.post(URL)
    //         .set('authorization', `JWT ${USER.token}`)
    //         .send(account);

    //     const responseAnotherUser = await request.delete(`${URL}/${response.body.id}`)
    //         .set('authorization', `JWT ${ANOTHER_USER.token}`);

    //     expect(responseAnotherUser.status).toBe(403);
    //     expect(responseAnotherUser.body).toHaveProperty('error');
    //     expect(responseAnotherUser.body.error).toContain('não pertence');
    // });

    // test('Should don`t delete account with one or multiple transactions', async () => {
    //     const account = { name: `DelWithTrans${Date.now()}` };

    //     const response = await request.post(URL)
    //         .set('authorization', `JWT ${USER.token}`)
    //         .send(account);

    //     await request.post(URL_TRANSACTION)
    //         .set('authorization', `JWT ${USER.token}`)
    //         .send({
    //             ammount: 100,
    //             description: `Error delete account with transaction${Date.now()}`,
    //             type: Type.INPUT,
    //             status: true,
    //             acc_id: response.body.id
    //         });

    //     const responseDelte = await request.delete(`${URL}/${response.body.id}`)
    //         .set('authorization', `JWT ${USER.token}`);

    //     expect(responseDelte.status).toBe(400);
    //     expect(responseDelte.body).toHaveProperty('error');
    //     expect(responseDelte.body.error).toContain('transações vinculadas a ela');
    // });
})