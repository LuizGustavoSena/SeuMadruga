export type CreateProps = {
    name: string;
    user_id: number;
}

export type CreateResponse = {
    id: number;
    name: String;
}

export type GetAllResponse = CreateResponse[];

export type GetByIdResponse = CreateResponse;