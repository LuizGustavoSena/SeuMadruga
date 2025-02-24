import BalanceDatabaseSpy from '../mocks/balanceDatabaseSpy';
import BalanceService from './balance';

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

});