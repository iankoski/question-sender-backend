import {Request, Response} from 'express';
import {answerSchema, answerUpdateSchema} from '../models/answerSchemas';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';

/*Valida o schema recebido como parâmetro de entrada*/

function validateAnswerSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(answerSchema, req, res, next);
}

function validateUpdateAnswerSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(answerUpdateSchema, req, res, next);
}

export {validateAnswerSchema, validateUpdateAnswerSchema};