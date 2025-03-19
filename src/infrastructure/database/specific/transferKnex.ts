import { TransferDatabase } from "@src/data/protocols/database/specif/transferDatabase";
import { TransactionProps, Type } from "@src/domain/models/transaction";
import { insertTransactionsProps } from "@src/domain/models/transfer";
import TransactionKnexDatabase from "./transactionKnex";

export default class TransferKnexDatabase extends TransactionKnexDatabase implements TransferDatabase {
    constructor() {
        super();
    }

    async insertTransactions(params: insertTransactionsProps): Promise<void> {
        const transactionsTo: TransactionProps = {
            description: `Transfer to account_id: ${params.acc_dest_id}`,
            acc_id: params.acc_ori_id,
            ammount: params.ammount * -1,
            date: params.date,
            type: Type.OUTPUT,
            transfer_id: params.id,
            status: true
        }

        await this.create(transactionsTo);

        const transactionFrom: TransactionProps = {
            description: `Transfer from account_id: ${params.acc_ori_id}`,
            acc_id: params.acc_dest_id,
            ammount: params.ammount,
            date: params.date,
            type: Type.INPUT,
            transfer_id: params.id,
            status: true
        }

        await this.create(transactionFrom);
    }
}