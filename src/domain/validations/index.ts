import { z } from "zod";

export default class Validation {
    constructor() { };

    static createUser(params: any): void {
        const validation = z.object({
            name: z.string({ required_error: 'Campo name deve ser preenchido' }),
            email: z.string().email({ message: 'Campo email deve ser do tipo email' }),
            password: z.string().min(5, { message: 'Campo password deve conter no mínimo 5 caracteres' })
        });

        validation.parse(params);
    }
}