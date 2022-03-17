import questionModel, {IQuestionModel} from './questionModel';
import {IQuestion} from './questions';
import {DestroyOptions, Op} from 'sequelize';
import {QuestionStatus} from './questionStatus';

function findAll(customerId: number, includeRemoved: boolean){
    if (includeRemoved)
        return questionModel.findAll<IQuestionModel>({where: {customerId: customerId}});
    //Excluindo os com status REMOVED
    return questionModel.findAll<IQuestionModel>({where: {customerId: customerId, status:{[Op.not]: QuestionStatus.REMOVED}}});
};

function findById(id: number, customerId: number, companyId: number){
    return questionModel.findAll<IQuestionModel>({where: {id: id, customerId: customerId, companyId: companyId}});
}

function findByCompanyId(companyId: number){
    return questionModel.findAll<IQuestionModel>({where: {companyId: companyId}});
}

function add(question: IQuestion){
    return questionModel.create(question);
}

async function set(questionId: number, question: IQuestion, customerId: number){
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalQuestion = await questionModel.findOne({where: {id: questionId, customerId: customerId}});
    if (!originalQuestion) return null;

    if (question.description) originalQuestion.description = question.description;
    if (question.timeToLive) originalQuestion.timeToLive = question.timeToLive;
    if (question.status) originalQuestion.status = question.status;

    const result = await originalQuestion.save();
    question.id = result.id;
    return question;
}

async function removeById (id: number){
    return questionModel.destroy({where: {id: id}} as DestroyOptions<IQuestion>);
}

export default {findAll, findById, add, set, removeById, findByCompanyId};