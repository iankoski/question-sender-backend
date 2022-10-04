import {Request, Response} from 'express';
import {newSchema, newUpdateSchema} from '../models/newSchemas';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';

/*Valida o schema recebido como parâmetro de entrada*/

function validateNewSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(newSchema, req, res, next);
}

function validateUpdateNewSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(newUpdateSchema, req, res, next);
}

export {validateNewSchema, validateUpdateNewSchema};