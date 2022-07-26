import questionModel, { IQuestionModel } from './questionModel';
import { IQuestion } from './questions';
import { DestroyOptions, Op, QueryTypes } from 'sequelize';
import { QuestionStatus } from './questionStatus';
import sequelize from 'ms-commons/data/db';

function findAll(companyId: number, includeRemoved: boolean) {
    if (includeRemoved)
        return questionModel.findAll<IQuestionModel>({ where: { companyId: companyId } });
    //Excluindo os com status REMOVED
    return questionModel.findAll<IQuestionModel>({ where: { companyId: companyId, status: { [Op.not]: QuestionStatus.REMOVED } } });
};

function findById(id: number) {
    return questionModel.findOne<IQuestionModel>({ where: { id: id } });
}

function findByCompanyId(companyId: number) {
    return questionModel.findAll<IQuestionModel>({ where: { companyId: companyId } });
}

function add(question: IQuestion) {
    return questionModel.create(question);
}

async function set(questionId: number, question: IQuestion) {
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalQuestion = await questionModel.findOne({ where: { id: questionId } });
    if (!originalQuestion) return null;

    if (question.description) originalQuestion.description = question.description;
    if (question.startDate) originalQuestion.startDate = question.startDate;
    if (question.endDate) originalQuestion.endDate = question.endDate;
    if (question.status) originalQuestion.status = question.status;

    const result = await originalQuestion.save();
    question.id = result.id;
    return question;
}

async function removeById(id: number) {
    return questionModel.destroy({ where: { id: id } } as DestroyOptions<IQuestion>);
}

async function findByBetweenDate(companyId: number, deviceId: string) {

    const result = await sequelize.query(`select * 
                                              from questions
                                             where questions.endDate >= current_date() 
                                               and questions.startDate <= current_date()
                                               and questions.companyId = ${companyId}
                                               and not exists (select 1 
                                                                 from answers 
                                                                where answers.questionId = questions.id and answers.deviceId = "${deviceId}");`,
        { type: QueryTypes.SELECT });
    
    return result;
    /*
return questionModel.findAll<IQuestionModel>({
where: {
companyId: companyId,
status: { [Op.not]: QuestionStatus.REMOVED },
endDate: { [Op.gte]: currentDate },
startDate: { [Op.lte]: currentDate }
}
});*/
}

export default { findAll, findById, add, set, removeById, findByCompanyId, findByBetweenDate };