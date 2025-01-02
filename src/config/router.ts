import express from 'express';

module.exports = (app: any) => {
    const protectedRouter = express.Router();

    app.use('/auth', app.routes.auth);

    protectedRouter.use('/accounts', app.routes.accounts);
    protectedRouter.use('/transactions', app.routes.transactions);
    protectedRouter.use('/transfers', app.routes.transfers);
    protectedRouter.use('/balance', app.routes.balance);

    app.use('/v1', app.config.passport.authenticate(), protectedRouter)
}