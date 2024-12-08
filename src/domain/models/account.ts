export type CreateProps = {
    name: string;
    user_id: number;
}

export type CreateResponse = {
    id: number;
    name: String;
    user_id: number;
}

export type GetAllResponse = CreateResponse[];

export type GetByIdResponse = CreateResponse;

export type UpdateParams = {
    id: number;
    name: string
}

export type UpdateResponse = CreateResponse;