export class ExistingTransactionsError extends Error {
    constructor() {
        super('Não é possível excluir conta por ter transações vinculadas a ela');
        this.name = 'ExistingTransactionsError';
    }
}