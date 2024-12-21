export type TransferProps = {
    id: number;
    description: string;
    date: Date;
    ammount: number;
    acc_ori_id: number;
    acc_dest_id: number;
    user_id: number;
}

export type CreateTransfer = Omit<TransferProps, 'id'>;
export type CreateTransferResponse = TransferProps;