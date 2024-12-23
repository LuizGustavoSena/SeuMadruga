export type TransactionProps = {
    description: string;
    type: Type;
    date: Date;
    ammount: number;
    acc_id: number;
    transfer_id?: number;
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

export type CreateProps = Omit<FindResponse, 'date' | 'id'>

export type CreateResponse = FindResponse;

export type UpdateProps = Partial<Omit<FindResponse, 'acc_id' | 'id'>>

export type UpdateResponse = FindResponse;
