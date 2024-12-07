import { UserModel } from './user';

declare global {
    namespace Express {
        export interface Request {
            user: UserModel
        }
    }
}