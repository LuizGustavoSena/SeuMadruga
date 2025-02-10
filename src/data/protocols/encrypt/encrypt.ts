export interface Encrypt {
    create(text: string): Promise<string>;
    compare(encryptText: string, text: string): Promise<boolean>;
}