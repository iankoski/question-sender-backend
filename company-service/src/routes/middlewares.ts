import {Router, Request, Response} from 'express';
import {companySchema, companyUpdateSchema, loginSchema} from '../models/companySchemas';
import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

/*Valida o schema recebido como parâmetro de entrada*/

/* Valida o formato da requisição, se é de fato uma company
 * que está sendo passada*/ 
function validateCompanySchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(companySchema, req, res, next);
}

function validateUpdateCompanySchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(companyUpdateSchema, req, res, next);
}
/* Valida o formato da requisição, se é de fato um login que
 * está sendo enviado*/
function validateLoginSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validateSchema(loginSchema, req, res, next);
}

async function validateAuthentication(req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req, res, next);
}

function validateAuthorization(req: Request, res: Response, next: any){
    const companyId = parseInt(req.params.id);
    /*Testa se o parseInt converteu para de fato um número*/
    if(!companyId) return res.status(400).end();

    /* Compara o id que será atualizado/excluindo com o que está tentando manipular
     * somente quem pode manipular uma conta é o dono dela  */
    const token = controllerCommons.getToken(res) as Token;
    if (companyId !== token.companyId) return res.status(403).end();     
    
    next();
}

export {validateCompanySchema, validateAuthorization, validateLoginSchema, validateUpdateCompanySchema, validateAuthentication};