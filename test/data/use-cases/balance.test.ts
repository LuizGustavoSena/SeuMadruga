import BalanceService from '@src/data/use-cases/balance';
import { responseBalance } from '@test/domain/mocks/responseBalance';
import BalanceDatabaseSpy from '../mocks/balanceDatabaseSpy';

type Props = {
    sut: BalanceService;
    database: BalanceDatabaseSpy;
}

const makeSut = (): Props => {
    const database = new BalanceDatabaseSpy();
    const sut = new BalanceService(database);

    return {
        sut,
        database
    }
}

describe('Balance', () => {
    test('Should be successful get balance by userId', async () => {
        const { database, sut } = makeSut();

        const balance = responseBalance();

        database.content.push(balance);

        const response = await sut.getBalanceByUserId(balance.id);

        expect(response[0]).toEqual(balance);
        expect(database.params).toBe(balance.id);
    });
});