import { faker } from '@faker-js/faker/.';
import TransferService from '@src/data/use-cases/transfer';
import { makeTransfer } from '../mocks/insertTransfer';
import TransferDatabaseSpy from '../mocks/transferDatabaseSpy';

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
    test('Should be successful create transfer', async () => {
        const { sut, database } = makeSut();

        const transfer = makeTransfer();

        const response = await sut.create(transfer);

        expect(database.content[0].description).toBe(transfer.description);
        expect(database.content[0].user_id).toBe(transfer.user_id);
        expect(database.params.acc_dest_id).toBe(transfer.acc_dest_id);
        expect(database.params.acc_ori_id).toBe(transfer.acc_ori_id);
        expect(database.params.ammount).toBe(transfer.ammount);
        expect(database.params.date).not.toBe(transfer.date);
        expect(database.params.id).toBe(database.content[0].id);
        expect(response).toEqual(database.content[0]);
    });

    test('Should be successful find transfer by id', async () => {
        const { sut, database } = makeSut();

        const transfer = {
            ...makeTransfer(),
            id: faker.number.int()
        };

        database.content.push(transfer)

        const response = await sut.find({ id: transfer.id });

        expect(response[0]).toEqual(database.content[0]);
    });
});