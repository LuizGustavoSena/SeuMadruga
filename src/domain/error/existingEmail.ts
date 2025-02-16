export class ExistingEmailError extends Error {
    constructor() {
        super('Email já existente');
        this.name = 'ExistingEmailError';
    }
}