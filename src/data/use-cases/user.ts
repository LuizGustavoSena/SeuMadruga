import { Database } from '@src/data/protocols/database/database';
import { Encrypt } from '@src/data/protocols/encrypt/encrypt';
import { ExistingEmailError } from '@src/domain/error/existingEmail';
import { FindByEmailResponse, UserModel, UserProps } from '@src/domain/models/user';
import { User } from '@src/domain/use-cases/user';
import { UserValidation } from '@src/domain/validations/user';

export default class UserService implements User {
    constructor(
        private readonly db: Database,
        private readonly encrypt: Encrypt,
        private readonly validation: UserValidation
    ) { }

    async findByEmail(email: string): Promise<FindByEmailResponse> {
        const users = await this.db.getByFIlter<FindByEmailResponse[]>({ email });

        return users[0];
    }

    async save(params: UserProps): Promise<UserModel> {
        this.validation.create(params);

        const existEmail = await this.findByEmail(params.email);

        if (existEmail)
            throw new ExistingEmailError();

        const encryptPassword = await this.encrypt.create(params.password);

        var response = await this.db.create<UserProps, Partial<UserProps> & { id: number }>({ ...params, password: encryptPassword });

        delete response.password;

        return response as UserModel;
    }
}