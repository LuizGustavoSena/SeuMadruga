import { z } from "zod";
import { Type } from "../models/transaction";

export default class Validation {
    constructor() { };

    static createUser(params: any): void {
        const validation = z.object({
            name: z.string({ required_error: 'Campo name deve ser preenchido' }),
            email: z.string({ required_error: 'Campo email deve ser preenchido' }).email({ message: 'Campo email deve ser do tipo email' }),
            password: z.string({ required_error: 'Campo password deve ser preenchido' }).min(5, { message: 'Campo password deve conter no mínimo 5 caracteres' })
        });

        validation.parse(params);
    }

    static createAccount(params: any): void {
        const validation = z.object({
            name: z.string({ required_error: 'Campo name deve ser preenchido' })
        });

        validation.parse(params);
    }

    static createTransaction(params: any): void {
        const inputType = z.object({
            ammount: z.number().positive({ message: 'Campo ammount deve ser positivo' })
        });

        const outputType = z.object({
            ammount: z.number().negative({ message: 'Campo ammount deve ser negativo' })
        });

        const validation = z.object({
            description: z.string({ required_error: 'Campo description deve ser preenchido' }),
            type: z.nativeEnum(Type, { required_error: 'Campo type deve ser obrigatório' }),
            ammount: z.number({ required_error: 'Campo ammount deve ser preenchido', message: 'Campo ammount deve ser do tipo number' }),
        }).merge(params.type === Type.INPUT ? inputType : outputType);

        validation.parse(params);
    }
}