export type UserProps = {
    name: string;
    password: string;
    email: string;
}

export type UserModel = Omit<UserProps, 'password'> & { id: number }

export type FindByEmailResponse = {
    id: number;
    name: string;
    email: string;
    password: string;
}