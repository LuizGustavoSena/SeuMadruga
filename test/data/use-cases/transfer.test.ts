import TransferDatabaseSpy from '../mocks/transferDatabaseSpy';
import TransferService from './transfer';

type Props = {
    sut: TransferService;
    database: TransferDatabaseSpy;
}

const makeSut = (): Props => {
    const database = new TransferDatabaseSpy();
    const sut = new TransferService(database);

    return {
        sut,
        database
    }
}

describe('Transfer', () => {

});