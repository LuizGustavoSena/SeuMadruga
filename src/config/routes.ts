import { Express } from "express";

module.exports = (app: Express) => {
    app.route('/users')
        .get(app.routes.users.findAll)
        .post(app.routes.users.create);

    app.route('/accounts')
        .get(app.routes.accounts.getAll)
        .post(app.routes.accounts.create);

    app.route('/accounts/:id')
        .get(app.routes.accounts.getById)
        .put(app.routes.accounts.update)
        .delete(app.routes.accounts.deleteById)
}