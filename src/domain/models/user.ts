export type UserModel = {
    id: number;
    name: string;
    email: string;
}

export type UserProps = {
    name: string;
    password: string;
    email: string;
}

export type FindByEmailResponse = {
    id: number;
    name: string;
    email: string;
    password: string;
}