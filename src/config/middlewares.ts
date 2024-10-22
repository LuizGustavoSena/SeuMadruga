import bodyParser from "body-parser";
import { Express } from 'express';

const Middle = (app: Express) => app.use(bodyParser.json());

export default Middle;