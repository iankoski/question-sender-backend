/* Define o formato de uma question, os campos que ela deve ter e validações básicas 
 * Responsabilidade do Schema do JOI => Validação de Objetos*/
import Joi from 'joi';
const answerSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    companyId: Joi.number()
        .integer()
        .min(1),
    questionId: Joi.number()
        .integer()
        .min(1),
    alternativeId: Joi.number()
        .integer()
        .min(1),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    deviceId: Joi.string()
        .min(10)
        .max(200)        

})

const answerUpdateSchema = Joi.object({

    status: Joi.number()
        .integer()
        .min(100)
        .max(400)      
})

export { answerSchema, answerUpdateSchema};