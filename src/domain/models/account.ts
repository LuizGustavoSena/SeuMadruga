export type CreateResponse = {
    id: number;
    name: String;
    user_id: number;
}

export type CreateProps = Omit<CreateResponse, 'id'>;

export type GetAllResponse = CreateResponse[];

export type GetByIdResponse = CreateResponse;

export type UpdateParams = Omit<CreateResponse, 'user_id'>;

export type UpdateResponse = CreateResponse;