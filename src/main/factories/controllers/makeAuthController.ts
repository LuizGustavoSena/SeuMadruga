import AuthController from "@src/main/controllers/authController";
import MakeAuthService from "../use-cases/makeAuthService";
import MakeUserService from "../use-cases/makeUserService";
import MakeAuthValidation from "../validation/auth";
import MakeUserValidation from "../validation/user";

export default class MakeAuthController {
    static instance: AuthController;

    static getInstance() {
        if (!MakeAuthController.instance) {
            const authService = MakeAuthService.getInstance();
            const userService = MakeUserService.getInstance();
            const authValidation = MakeAuthValidation.getInstance();
            const userValidation = MakeUserValidation.getInstance();

            MakeAuthController.instance = new AuthController(authService,
                userService,
                authValidation,
                userValidation
            );
        }

        return MakeAuthController.instance;
    }
}