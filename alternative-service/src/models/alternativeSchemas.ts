/* Define o formato de uma alternative, os campos que ela deve ter e validações básicas 
 * Responsabilidade do Schema do JOI => Validação de Objetos*/
import Joi from 'joi';
const alternativeSchema = Joi.array().items(Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    questionId: Joi.number()
        .integer()
        .min(1),
    description: Joi.string()
        .min(5),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400)

}))

const alternativeUpdateSchema = Joi.object({

    description: Joi.string()
        .min(5),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400)    
})

export { alternativeSchema, alternativeUpdateSchema};