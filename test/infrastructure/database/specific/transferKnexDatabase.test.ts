import { FindResponse, Type } from "@src/domain/models/transaction";
import TransferKnexDatabase from "@src/infrastructure/database/specific/transferKnex";
import { makeInsertTransactions } from "@test/domain/mocks/insertTransfer";

const sut: TransferKnexDatabase = new TransferKnexDatabase();

describe('TransactionKnexDatabase', () => {
    beforeAll(async () => {
        await sut.db.migrate.latest();
    });

    afterAll(async () => {
        await sut.db.destroy();
    });

    test('Should be successful insert transactions by transfer', async () => {
        const transfer = makeInsertTransactions();

        await sut.insertTransactions(transfer);

        const response = await sut.getAll<FindResponse[]>();

        expect(response).toHaveLength(2);

        expect(response[0].description).toBe(`Transfer to account_id: ${transfer.acc_dest_id}`)
        expect(response[0].acc_id).toBe(transfer.acc_ori_id);
        expect(response[0].ammount < 0).toBeTruthy();
        expect(response[0].date).toBe(transfer.date);
        expect(response[0].type).toBe(Type.OUTPUT);
        expect(response[0].transfer_id).toBe(transfer.id);
        expect(response[0].status).toBeTruthy();

        expect(response[1].description).toBe(`Transfer from account_id: ${transfer.acc_ori_id}`)
        expect(response[1].acc_id).toBe(transfer.acc_dest_id);
        expect(response[1].ammount > 0).toBeTruthy();
        expect(response[1].date).toBe(transfer.date);
        expect(response[1].type).toBe(Type.INPUT);
        expect(response[1].transfer_id).toBe(transfer.id);
        expect(response[1].status).toBeTruthy();
    });
});