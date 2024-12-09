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
    acc_id: number;
}

export type CreateProps = {
    description: string;
    type: Type;
    ammount: number;
    acc_id: number;
}

export type CreateResponse = FindResponse;

export type UpdateProps = {
    description?: string;
    type?: Type;
    date?: Date;
    ammount?: number;
}

export type UpdateResponse = FindResponse;
