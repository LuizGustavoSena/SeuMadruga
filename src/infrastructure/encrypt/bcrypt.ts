import { Encrypt } from "../../data/protocols/encrypt/encrypt";
const bcrypt = require('bcryptjs');

export default class BcryptEncrypt implements Encrypt {
    constructor() { }

    async create(text: string): Promise<string> {
        const sant = await bcrypt.genSalt(10);
        return await bcrypt.hash(text, sant);
    }

    async compare(encryptText: string, text: string): Promise<boolean> {
        const response = await bcrypt.compare(encryptText, text);

        return response;
    }
    ;
}