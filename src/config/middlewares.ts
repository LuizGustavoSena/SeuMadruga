import bodyParser from "body-parser";
import { Express } from 'express';

module.exports = (app: Express) => app.use(bodyParser.json());