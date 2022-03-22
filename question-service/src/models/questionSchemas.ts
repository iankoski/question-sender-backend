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
    description: Joi.string()
        .min(5),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    startDate: Joi.date(),
    endDate: Joi.date()

})

const questionUpdateSchema = Joi.object({

    description: Joi.string()
        .min(5),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    startDate: Joi.date(),
    endDate: Joi.date()        
})

export { questionSchema, questionUpdateSchema};