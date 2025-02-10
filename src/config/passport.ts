import KnexDatabase from '@src/infrastructure/database/knex';
import BcryptEncrypt from '@src/infrastructure/encrypt/bcrypt';
import 'dotenv/config';
import { Express } from "express";
import UserService from '../services/user';

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const userService = new UserService(new KnexDatabase('users'), new BcryptEncrypt());

module.exports = (app: Express) => {
    const params = {
        secretOrKey: process.env.SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt')
    };

    const strategy = new Strategy(params, async (payload: any, done: any) => {
        try {
            const user = await userService.findByEmail(payload.email);

            if (user) {
                done(null, { ...payload });
                return;
            }

            done(null, false);
        } catch (error) {
            done(error, false);
        }
    });

    passport.use(strategy);

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}