import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import authCommons, {Token} from 'ms-commons/api/auth';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'), 'utf8');
const jwtExpires = parseInt(`${process.env.JWT_EXPIRES}`);
//RS256 é o algorítmo de hash usado para trabalhar a chave, do RSA
const jwtAlgorithm = "RS256";

function hashPassword(password: string){
    /* hashSync é uma função que só deixa seguir a execução do programa
     * quando o hash terminar de ser criado. O primeiro parâmetro é a string
     * o segundo o salt, que aumentará a complexidade do hash. O salt
     * personaliza o Hash, logo, um hash criado em outra aplicação com 
     * a senha 123, será diferente do hash criado nesta, que foi utilizado
     * o salt*/
    return bcrypt.hashSync(password, 10);
}

function comparePassword(password: string, hashPassword: string){
    return bcrypt.compareSync(password, hashPassword);
}


function sign(customerId: number){
    /* Chave pública disponibilizada para todas as APIS que forem
     * receber tokens autenticados por mim */
    const token : Token = {customerId};
    return jwt.sign(token, privateKey, {expiresIn: jwtExpires,algorithm: jwtAlgorithm});
}

async function verify(token: string){
    return authCommons.verify(token);
}

export default {hashPassword, comparePassword, sign, verify};