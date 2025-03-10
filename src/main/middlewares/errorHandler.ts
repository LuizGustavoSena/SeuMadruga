import { ValidationError } from '@src/domain/error/validationError';
import { Response } from 'express';

const errorHandler = (err: Error, res: Response) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({ error: err.message });
    }

    return res.status(500).json({ error: "Internal server error" });
};

export { errorHandler };

