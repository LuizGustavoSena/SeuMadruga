export type ParamsUpdateDatabase<T> = {
    id: number;
    data: Partial<Omit<T, 'id'>>
}

export interface Database {
    tableName: string;

    create<T, R>(params: T): Promise<R>;
    getAll<T>(): Promise<T>;
    getByFIlter<T>(filter: any): Promise<T>;
    update<T>(params: ParamsUpdateDatabase<T>): Promise<T>;
    deleteById(id: number): Promise<void>;
}