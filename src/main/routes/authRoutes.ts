import express from "express";
import MakeAuthController from "../factories/controllers/makeAuthController";

const router = express.Router();

const authController = MakeAuthController.getInstance();

router.post('/signin', authController.login);

router.post('/signup', authController.create);
