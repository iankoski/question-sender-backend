import questionModel, {IQuestionModel} from './questionModel';
import {IQuestion} from './questions';
import {DestroyOptions, Op} from 'sequelize';
import {QuestionStatus} from './questionStatus';

function findAll(companyId: number, includeRemoved: boolean){
    if (includeRemoved)
        return questionModel.findAll<IQuestionModel>({where: {companyId: companyId}});
    //Excluindo os com status REMOVED
    return questionModel.findAll<IQuestionModel>({where: {companyId: companyId, status:{[Op.not]: QuestionStatus.REMOVED}}});
};

function findById(id: number, companyId: number){
    return questionModel.findOne<IQuestionModel>({where: {id: id, companyId: companyId}});
}

function findByCompanyId(companyId: number){
    return questionModel.findAll<IQuestionModel>({where: {companyId: companyId}});
}

function add(question: IQuestion){
    return questionModel.create(question);
}

async function set(questionId: number, question: IQuestion){
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalQuestion = await questionModel.findOne({where: {id: questionId}});
    if (!originalQuestion) return null;

    if (question.description) originalQuestion.description = question.description;
    if (question.startDate) originalQuestion.startDate = question.startDate;
    if (question.endDate) originalQuestion.endDate = question.endDate;
    if (question.status) originalQuestion.status = question.status;

    const result = await originalQuestion.save();
    question.id = result.id;
    return question;
}

async function removeById (id: number){
    return questionModel.destroy({where: {id: id}} as DestroyOptions<IQuestion>);
}

export default {findAll, findById, add, set, removeById, findByCompanyId};