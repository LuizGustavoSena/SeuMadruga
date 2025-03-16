export type UserProps = {
    name: string;
    password: string;
    email: string;
}

export type UserModel = Omit<UserProps, 'password'> & { id: number }

export type FindByEmailResponse = UserProps & { id: number }