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

    static loginUser(params: any): void {
        const validation = z.object({
            email: z.string({ required_error: 'Campo email deve ser preenchido' }).email({ message: 'Campo email deve ser do tipo email' }),
            password: z.string({ required_error: 'Campo password deve ser preenchido' }).min(5, { message: 'Campo password deve conter no mínimo 5 caracteres' })
        });

        validation.parse(params);
    }

    static createOrUpdateAccount(params: any): void {
        const validation = z.object({
            name: z.string({ required_error: 'Campo name deve ser preenchido' })
        });

        validation.parse(params);
    }

    static createTransaction(params: any): void {
        const inputType = z.object({
            ammount: z.number({ required_error: 'Campo ammount deve ser preenchido' }).positive({ message: 'Campo ammount deve ser positivo' })
        });

        const outputType = z.object({
            ammount: z.number({ required_error: 'Campo ammount deve ser preenchido' }).negative({ message: 'Campo ammount deve ser negativo' })
        });

        const validation = z.object({
            description: z.string({ required_error: 'Campo description deve ser preenchido' }),
            acc_id: z.number({ required_error: 'Campo acc_id deve ser preenchido' }),
            type: z.nativeEnum(Type, { required_error: 'Campo type deve ser preenchido', message: 'type inválido' }),
        }).merge(params.type === Type.INPUT ? inputType : outputType);

        validation.parse(params);
    }

    static createTransfer(params: any): void {
        const validation = z.object({
            description: z.string({ required_error: 'Campo description deve ser preenchido' }),
            ammount: z.number({ required_error: 'Campo ammount deve ser preenchido' }),
            acc_ori_id: z.number({ required_error: 'Campo acc_ori_id deve ser preenchido' }),
            acc_dest_id: z.number({ required_error: 'Campo acc_dest_id deve ser preenchido' }),
        }).refine(data => data.acc_ori_id !== data.acc_dest_id, { message: 'acc_ori_id e acc_dest_id devem ter valores diferentes' });

        validation.parse(params);
    }
}