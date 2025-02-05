import { TransactionProps, Type } from "@src/domain/models/transaction";
import { insertTransactionsProps } from "@src/domain/models/transfer";
import { TransactionDatabase } from "@src/infrastructure/models/transactionDatabase";
import { TransferDatabase } from "@src/infrastructure/models/transferDatabase";
import KnexDatabase from "../knex";

export default class TransferKnexDatabase extends KnexDatabase implements TransferDatabase {
    constructor(
        private readonly dbTransaction: TransactionDatabase
    ) {
        super('transfers');
    }

    async deleteTransactionsByTransferId(id: number): Promise<void> {
        await this.dbTransaction.deleteByTransferId(id);
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

        await this.dbTransaction.create(transactionsTo);

        const transactionFrom: TransactionProps = {
            description: `Transfer from account_id: ${params.acc_ori_id}`,
            acc_id: params.acc_dest_id,
            ammount: params.ammount,
            date: params.date,
            type: Type.INPUT,
            transfer_id: params.id,
            status: true
        }

        await this.dbTransaction.create(transactionFrom);
    }

}