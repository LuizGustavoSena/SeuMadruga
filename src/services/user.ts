import { FindByEmailResponse, UserModel, UserProps } from '@src/domain/models/user';
import { Database } from '@src/infrastructure/models/database';
import { Encrypt } from '@src/infrastructure/models/encrypt';

export default class UserService {
    constructor(
        private readonly db: Database,
        private readonly encrypt: Encrypt
    ) { }

    async findByEmail(email: string): Promise<FindByEmailResponse> {
        const users = await this.db.getByFIlter<FindByEmailResponse[]>({ email });

        return users[0];
    }

    async save(params: UserProps): Promise<UserModel> {
        const existEmail = await this.findByEmail(params.email);

        if (existEmail)
            throw new Error('Email já existente');

        const encryptPassword = await this.encrypt.create(params.password);

        var response = await this.db.create<UserProps, Partial<UserProps> & { id: number }>({ ...params, password: encryptPassword });

        delete response.password;

        return response as UserModel;
    }
}