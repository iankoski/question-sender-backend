/* Define o formato de uma company, os campos que ela deve ter e validações básicas 
 * Responsabilidade do Schema do JOI => Validação de Objetos*/
import Joi from 'joi';
const companySchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    name: Joi.string()
        .min(3)
        .max(150)
        .required(),
    userName: Joi.string()
        .min(3)
        .max(150)
        .required(),     
    password: Joi.string()
        .min(6)
        .max(200)
        .required(),          
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    urlQrCode: Joi.string()
        
})

const companyUpdateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150),
    password: Joi.string()
        .min(6)
        .max(200),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    uqlQrCode: Joi.string()    
})

const loginSchema = Joi.object({
    userName: Joi.string()
        .min(3)
        .max(150)
        .required(),
    password: Joi.string()
        .min(6)
        .max(200)
        .required()
})

export { companySchema, loginSchema, companyUpdateSchema};