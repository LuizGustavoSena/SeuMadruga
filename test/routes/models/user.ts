
export type user = {
    id?: number;
    token?: string;
    name: string;
    email: string;
    password: string;
}

export type account = {
    user_id: number;
    name: string;
    id?: number;
}