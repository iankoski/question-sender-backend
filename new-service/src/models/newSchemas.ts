
import Joi from 'joi';
const JoiDate = require('joi')
    .extend(require('@joi/date'));
const newSchema = Joi.object({
    id: Joi.number()
        .integer()
        .min(1),
    companyId: Joi.number()
        .integer()
        .min(1),
    description: Joi.string()
        .min(5)
        .max(2000),
    status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    startDate: Joi.date(),
    title: Joi.string()
        .min(5)
        .max(60),
    endDate: Joi.date(),

})

const newUpdateSchema = Joi.object({

    description: Joi.string()
        .min(5),
        status: Joi.number()
        .integer()
        .min(100)
        .max(400),
    startDate: Joi.date(),
    endDate: Joi.date(),
    title: Joi.string()
})

export { newSchema, newUpdateSchema };