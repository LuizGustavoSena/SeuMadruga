export type FindProps = {
    user_id: number;
    filter?: any;
}

export enum Type {
    ACTIVE = 'I',
    INACTIVE = 'O',
}

export type FindResponse = {
    id: number;
    description: string;
    type: Type;
    date: Date;
    ammount: number;
    status: boolean;
    acc_id: number;
}

export type CreateProps = {
    description: string;
    type: Type;
    ammount: number;
    status: boolean;
    acc_id: number;
}

export type CreateResponse = FindResponse;