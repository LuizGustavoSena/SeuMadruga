import app from '@src/app';
import { FindResponse, Type } from '@src/domain/models/transaction';
import AccountService from '@src/services/account';
import AuthService from '@src/services/auth';
import TransactionService from '@src/services/transaction';
import UserService from '@src/services/user';
import supertest from 'supertest';
import { account, user } from './models/user';

const URL_TRANSACTION = '/v1/transactions';

const request = supertest(app);
const userService = new UserService();
const authService = new AuthService(userService);
const serviceAccount = new AccountService();
const transactionService = new TransactionService();

const USERS: user[] = [
    {
        name: 'Walter Mitty',
        email: `${Date.now()}@email.com`,
        password: '12354'
    },
    {
        name: 'Another Mitty',
        email: `2${Date.now()}@email.com`,
        password: '12354'
    }
];

const ACCOUNTS: account[] = [
    {
        user_id: USERS[0].id ?? 0,
        name: 'Account 1'
    },
    {
        user_id: USERS[1].id ?? 0,
        name: 'Account 2'
    }
]

describe('Transaction', () => {
    beforeAll(async () => {
        for await (var user of USERS) {
            const response = await userService.save(user);;
            user.id = response.id;

            const token = await authService.signin({
                email: user.email,
                password: user.password
            });
            user.token = token.token;
        };

        ACCOUNTS[0].user_id = USERS[0].id ?? 0;
        ACCOUNTS[1].user_id = USERS[1].id ?? 0;

        for await (var account of ACCOUNTS) {
            const response = await serviceAccount.create({
                name: account.name,
                user_id: account.user_id
            });
            account.id = response.id;
        }
    });

    test('Should be empty list transaction', async () => {
        const response = await request.get(URL_TRANSACTION)
            .set('authorization', `JWT ${USERS[0].token}`);

        expect(response.status).toBe(204);
    });

    test('Should be successful create a transaction', async () => {
        const response = await transactionService.create({
            acc_id: ACCOUNTS[0].id ?? 0,
            ammount: 100,
            description: 'Successful transaction',
            status: true,
            type: Type.ACTIVE
        });

        expect(response).toHaveProperty('id');
    });

    test('Should don`t list another transaction account`s', async () => {
        const description = 'Don`t list another transaction account`s';

        await transactionService.create({
            acc_id: ACCOUNTS[0].id ?? 0,
            ammount: 100,
            description,
            status: true,
            type: Type.ACTIVE
        });

        await transactionService.create({
            acc_id: ACCOUNTS[1].id ?? 0,
            ammount: 100,
            description,
            status: true,
            type: Type.ACTIVE
        });

        const response = await request.get(URL_TRANSACTION)
            .set('authorization', `JWT ${USERS[0].token}`);

        const filter = response.body.filter((el: FindResponse) => el.description === description);

        expect(response.status).toBe(200);
        expect(filter).toHaveLength(1);
        expect(filter[0].acc_id).toBe(ACCOUNTS[0].id);
    });
});