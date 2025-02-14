import { FindByEmailResponse, UserModel, UserProps } from "../models/user";

export interface User {
    findByEmail(email: string): Promise<FindByEmailResponse>;
    save(params: UserProps): Promise<UserModel>;
}