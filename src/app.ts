import Middle from "@src/config/middlewares";
import express, { Express, Request, Response } from "express";

const app: Express = express();

Middle(app);

app.get('/', (req: Request, res: Response) => {
    res.status(200).send();
});

app.get('/users', (req: Request, res: Response) => {
    const users = [
        {
            name: 'John Doe',
            email: 'johndoe@email.com'
        }
    ]
    res.status(200).json(users);
});

app.post('/users', (req: Request, res: Response) => {
    res.status(201).json(req.body);
});

export default app;