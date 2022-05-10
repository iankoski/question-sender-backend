import {Router, Request, Response} from 'express';
import Joi from 'joi';
import auth from '../auth';

/* Valida o schema recebido como parâmetro de entrada
 * genérico para ser usado por todos os services*/
function validateSchema(schema: Joi.ObjectSchema<any>, req: Request, Res: Response, next: any){
    const {error} = schema.validate(req.body);
    if (error == null) return next();
    const {details} = error;
    const message = details.map(item => item.message).join(',');
    console.log(message);
    Res.status(422).end();
}

function validateArraySchema(schema: Joi.ArraySchema, req: Request, Res: Response, next: any){
    const {error} = schema.validate(req.body);
    if (error == null) return next();
    const {details} = error;
    const message = details.map(item => item.message).join(',');
    console.log(' validateArraySchema ' + message);
    Res.status(422).end();
}

async function validateAuth(req: Request, res: Response, next: any){
    try{
        const token = req.headers['x-access-token'] as string;
        if (!token) return res.status(401).end();
        const payload = await auth.verify(token);
        if (!payload) return res.status(401).end();
        /*Como manda a especificação do http, a informação vai pelo locals do response*/        
        res.locals.payload = payload;
        next();

    }catch(error){
        console.log(`validateAuth: ${error}`);
        res.status(401).end();
    }
}

export default {validateAuth, validateSchema, validateArraySchema};