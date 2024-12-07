import express from 'express';

module.exports = (app: any) => {
    const protectedRouter = express.Router();

    app.use('/auth',
        app.routes.auth);

    protectedRouter.use('/users',
        app.config.passport.authenticate(),
        app.routes.users);

    protectedRouter.use('/accounts',
        app.config.passport.authenticate(),
        app.routes.accounts);

    app.use('/v1', app.config.passport.authenticate(), protectedRouter)
}