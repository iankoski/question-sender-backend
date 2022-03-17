import {Request, Response} from 'express';
import {questionSchema, questionUpdateSchema} from '../models/questionSchemas';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';

/*Valida o schema recebido como parâmetro de entrada*/

function validateQuestionSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(questionSchema, req, res, next);
}

function validateUpdateQuestionSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(questionUpdateSchema, req, res, next);
}

export {validateQuestionSchema, validateUpdateQuestionSchema};