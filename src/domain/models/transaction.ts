export type TransactionProps = {
    description: string;
    type: Type;
    date: string;
    ammount: number;
    acc_id: number;
    transfer_id?: number;
    status: boolean;
}

export type FindProps = {
    user_id: number;
    filter?: any;
}

export enum Type {
    INPUT = 'I',
    OUTPUT = 'O',
}

export type FindResponse = TransactionProps & { id: number };

export type CreateProps = Omit<TransactionProps, 'date'> & { date?: string };

export type CreateResponse = FindResponse;

export type UpdateProps = Partial<Omit<TransactionProps, 'acc_id'>>

export type UpdateResponse = FindResponse;
