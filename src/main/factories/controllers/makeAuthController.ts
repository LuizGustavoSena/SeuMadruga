import AuthController from "@src/main/controllers/auth";
import MakeAuthService from "../use-cases/makeAuthService";
import MakeUserService from "../use-cases/makeUserService";

export default class MakeAuthController {
    static instance: AuthController;

    static getInstance() {
        if (!MakeAuthController.instance) {
            const authService = MakeAuthService.getInstance();
            const userService = MakeUserService.getInstance();

            MakeAuthController.instance = new AuthController(authService, userService);
        }

        return MakeAuthController.instance;
    }
}