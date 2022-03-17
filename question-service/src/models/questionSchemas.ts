/* Define o formato de uma question, os campos que ela deve ter e validações básicas 
 * Responsabilidade do Schema do JOI => Validação de Objetos*/
import Joi from 'joi';
const questionSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    companyId: Joi.number()
        .integer()
        .min(1),
    customerId: Joi.number()
        .integer()
        .min(1),        
    timeToLive: Joi.number()
        .integer()
        .min(1)
        .max(30),
    description: Joi.string()
        .min(5),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400)

})

const questionUpdateSchema = Joi.object({
    timeToLive: Joi.number()
        .integer()
        .min(1)
        .max(30),
    description: Joi.string()
        .min(5),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400)
})

export { questionSchema, questionUpdateSchema};