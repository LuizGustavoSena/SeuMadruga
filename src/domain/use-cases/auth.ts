import { SigninParams, SigninResponse } from "../models/auth";

export interface Auth {
    signin(params: SigninParams): Promise<SigninResponse>;
}