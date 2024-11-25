module.exports = (app: any) => {
    app.route('/auth/signin')
        .post(app.routes.auth.signin);

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.routes.users.findAll)
        .post(app.routes.users.create);

    app.route('/accounts')
        .all(app.config.passport.authenticate())
        .get(app.routes.accounts.getAll)
        .post(app.routes.accounts.create);

    app.route('/accounts/:id')
        .all(app.config.passport.authenticate())
        .get(app.routes.accounts.getById)
        .put(app.routes.accounts.update)
        .delete(app.routes.accounts.deleteById)
}