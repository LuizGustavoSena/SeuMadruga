import { CreateTransfer, CreateTransferResponse, TransferProps, UpdateTransferProps, UpdateTransferResponse } from '@src/domain/models/transfer';
import moment from 'moment';
import { TransferDatabase } from '../protocols/database/specif/transferDatabase';

export default class TransferService {

    constructor(
        private readonly db: TransferDatabase
    ) { }

    async find(filters: Partial<TransferProps>): Promise<TransferProps[]> {
        const response = await this.db.getByFIlter<TransferProps[]>(filters)

        return response;
    }

    async create(params: CreateTransfer): Promise<CreateTransferResponse> {
        const transfer = await this.db.create<CreateTransfer, TransferProps>({ ...params, date: moment().toISOString() });

        await this.db.insertTransactions({
            acc_dest_id: transfer.acc_dest_id,
            acc_ori_id: transfer.acc_ori_id,
            ammount: transfer.ammount,
            date: transfer.date,
            id: transfer.id
        });

        return transfer;
    }

    async update(params: UpdateTransferProps): Promise<UpdateTransferResponse> {
        const transfer = await this.db.update<TransferProps>({
            id: params.id,
            data: params.data
        });

        await this.db.deleteByTransferId(transfer.id);

        await this.db.insertTransactions({
            acc_dest_id: transfer.acc_dest_id,
            acc_ori_id: transfer.acc_ori_id,
            ammount: transfer.ammount,
            date: transfer.date,
            id: transfer.id
        });

        return transfer;
    }

    async deleteById(id: number): Promise<void> {
        await this.db.deleteByTransferId(id);

        await this.db.deleteById(id);
    }
}