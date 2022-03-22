import {Response} from 'express';
import {Token} from '../auth';

function getToken(res: Response){
    const payload = res.locals.payload as Token;
    /* Caso não tenha o payload ou o customerId, não está autorizado */
    if(!payload || !payload.companyId) return res.status(401).end();
    else return payload;
}

export default {getToken};