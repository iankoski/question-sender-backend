import {Request, Response} from 'express';
import {alternativeSchema, alternativeUpdateSchema} from '../models/alternativeSchemas';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';

/*Valida o schema recebido como parâmetro de entrada*/

function validateAlternativeSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateArraySchema(alternativeSchema, req, res, next);
}

function validateUpdateAlternativeSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateArraySchema(alternativeUpdateSchema, req, res, next);
}

export {validateAlternativeSchema, validateUpdateAlternativeSchema};