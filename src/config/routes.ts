import { Express } from "express";

module.exports = (app: Express) => {
    app.route('/users')
        .get(app.routes.users.findAll)
        .post(app.routes.users.create);

    app.route('/accounts')
        .get(app.routes.accounts.getAll)
        .post(app.routes.accounts.create);
}