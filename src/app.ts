import express, { Express, Request, Response } from "express";
const consign = require('consign');

const app: Express = express();

consign({ cwd: 'src', verbose: false })
    .include('config/middlewares.ts')
    .then('routes')
    .then('config/routes.ts')
    .into(app);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send();
});


export default app;