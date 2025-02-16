import { faker } from '@faker-js/faker';
import { Encrypt } from "../protocols/encrypt/encrypt";

export class EncryptSpy implements Encrypt {
    encryptText: string = faker.string.uuid();

    constructor() { };

    async create(text: string): Promise<string> {
        return `${this.encryptText}${text}`;
    }

    async compare(encryptText: string, text: string): Promise<boolean> {
        return encryptText.includes(`${this.encryptText}${text}`);
    }
}

export default class MakeEncryptSpy {
    private static instance: EncryptSpy;

    constructor() { };

    static getInstance() {
        if (!MakeEncryptSpy.instance)
            MakeEncryptSpy.instance = new EncryptSpy();

        return MakeEncryptSpy.instance;
    }
}