import MakeUserService from '@src/main/factories/use-cases/makeUserService';
import 'dotenv/config';
import { Express } from "express";

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const userService = MakeUserService.getInstance();

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