import express, { Express, Request, Response } from "express";
const consign = require('consign');

const app: Express = express();

consign({ cwd: 'src', verbose: false })
    .include('config/passport.ts')
    .then('config/middlewares.ts')
    .then('./routes')
    .then('./config/router.ts')
    .into(app);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send();
});


export default app;