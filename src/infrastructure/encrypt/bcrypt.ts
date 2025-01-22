import { Encrypt } from "../models/encrypt";
const bcrypt = require('bcryptjs');

export default class BcryptEncrypt implements Encrypt {
    constructor() { }

    async create(text: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async compare(encryptText: string, text: string): Promise<boolean> {
        const response = await bcrypt.compare(encryptText, text);

        return response;
    }
    ;
}