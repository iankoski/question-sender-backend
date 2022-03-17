import {Request, Response} from 'express';
import {companySchema, companyUpdateSchema, loginSchema} from '../models/companySchemas';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';

/*Valida o schema recebido como parâmetro de entrada*/

/* Valida o formato da requisição, se é de fato uma company
 * que está sendo passada*/ 
function validateCompanySchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(companySchema, req, res, next);
}

function validateUpdateCompanySchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(companyUpdateSchema, req, res, next);
}

async function validateAuthentication(req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req, res, next);
}

export {validateCompanySchema, validateUpdateCompanySchema, validateAuthentication};