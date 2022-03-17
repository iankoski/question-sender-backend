import {Router, Request, Response} from 'express';
import {customerSchema, customerUpdateSchema, loginSchema} from '../models/customerSchemas';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

/*Valida o schema recebido como parâmetro de entrada*/

/* Valida o formato da requisição, se é de fato um customer
 * que está sendo passado*/ 
function validateCustomerSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(customerSchema, req, res, next);
}

function validateUpdateCustomerSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(customerUpdateSchema, req, res, next);
}
/* Valida o formato da requisição, se é de fato um login que
 * está sendo enviado*/
function validateLoginSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(loginSchema, req, res, next);
}

async function validateAuthentication(req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req, res, next);
}

export {validateCustomerSchema, validateLoginSchema, validateUpdateCustomerSchema, validateAuthentication};