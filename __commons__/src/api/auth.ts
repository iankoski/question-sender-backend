import jwt, { VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/public.key'), 'utf8');
//RS256 é o algorítmo de hash usado para trabalhar a chave, do RSA
const jwtAlgorithm = "RS256";


export type Token = {companyId: number};

async function verify(token: string){
    try{
        const decoded : Token = await jwt.verify(token, publicKey, {algorithm: [jwtAlgorithm]} as VerifyOptions) as Token;
        return {companyId: decoded.companyId};
    }catch(error){
        console.log(`verify: ${error}`);
        return null;
    }
}

export default {verify};