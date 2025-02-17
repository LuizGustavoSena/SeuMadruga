export class ExistingAccountError extends Error {
    constructor() {
        super('Conta já existente');
        this.name = 'ExistingAccountError';
    }
}