import { Encrypt } from "@src/data/protocols/encrypt/encrypt";
import BcryptEncrypt from "@src/infrastructure/encrypt/bcrypt";

export default class MakeEncrypt {
    private static instance: Encrypt;

    private constructor() { }

    static getInstance(): Encrypt {
        if (!MakeEncrypt.instance)
            MakeEncrypt.instance = new BcryptEncrypt();

        return MakeEncrypt.instance;
    }
}