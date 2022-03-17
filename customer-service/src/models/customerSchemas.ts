/* Define o formato de uma customer, os campos que ela deve ter e validações básicas 
 * Responsabilidade do Schema do JOI => Validação de Objetos*/
import Joi from 'joi';
const customerSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    name: Joi.string()
        .min(3)
        .max(150)
        .required(),
    email: Joi.string()
        .email()
        .required()
        .min(8)
        .max(150),
    password: Joi.string()
        .min(6)
        .max(50)
        .required(),
    phone: Joi.string()
        .min(10)
        .max(15),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),        
})

const customerUpdateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(150),
    password: Joi.string()
        .min(6)
        .max(50),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    city: Joi.string()
        .min(3)
        .max(50),
    phone: Joi.string()
        .min(10)
        .max(15)       
})

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .min(8)
        .max(150),
    password: Joi.string()
        .min(6)
        .max(50)
        .required()
})

export { customerSchema, loginSchema, customerUpdateSchema};