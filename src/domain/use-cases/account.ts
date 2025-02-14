import { CreateProps, CreateResponse, GetAllResponse, GetByIdResponse, UpdateParams, UpdateResponse } from "../models/account";

export interface Account {
    create(params: CreateProps): Promise<CreateResponse>;
    getAll(): Promise<GetAllResponse>;
    getByFilter(filter: any): Promise<GetByIdResponse[]>;
    update(params: UpdateParams): Promise<UpdateResponse>;
    deleteById(id: number): Promise<void>;
}