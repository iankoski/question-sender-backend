import answerModel, { IAnswerModel } from './answerModel';
import { IAnswer } from './answers';
import { DestroyOptions, Op, QueryTypes } from 'sequelize';
import sequelize from 'ms-commons/data/db';
import { AnswerStatus } from './answerStatus';
//import {IAnswerCount} from './answersCountModel';

function findAll(companyId: number, includeRemoved: boolean) {
    if (includeRemoved)
        return answerModel.findAll<IAnswerModel>({ where: { companyId: companyId } });
    //Excluindo os com status REMOVED
    return answerModel.findAll<IAnswerModel>({ where: { companyId: companyId, status: { [Op.not]: AnswerStatus.REMOVED } } });
};

function findById(id: number, companyId: number) {
    return answerModel.findOne<IAnswerModel>({ where: { id: id, companyId: companyId } });
}

function findByQuestionId(questionId: number) {
    return answerModel.findAll<IAnswerModel>({ where: { companyId: questionId } });
}

function add(answer: IAnswer) {
    return answerModel.create(answer);
}

function findAndCountByAlternativeId(alternativeId: number) {
    return answerModel.count<IAnswerModel>({ where: { alternativeId: alternativeId } });
}

function findAndCountByQuestionId(questionId: number) {
    return answerModel.count<IAnswerModel>({ where: { questionId: questionId } });
}

async function set(answerId: number, answer: IAnswer) {
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalAnswer = await answerModel.findOne({ where: { id: answerId } });
    if (!originalAnswer) return null;

    if (answer.status) originalAnswer.status = answer.status;

    const result = await originalAnswer.save();
    answer.id = result.id;
    return answer;
}

async function removeById(id: number) {
    return answerModel.destroy({ where: { id: id } } as DestroyOptions<IAnswer>);
}

async function MostAnsweredAlterantive(questionId: number) {
    try {
        const [result] = await sequelize.query(`select alternativeId, count(*) as answersCount
                                                from answers
                                               where answers.questionId = ${questionId}
                                                 and answers.status = 100
                                                group by alternativeId
                                                order by answersCount desc;`, { type: QueryTypes.SELECT });
        return result;

    } catch (error) {
        console.log('MostAnsweredAlterantive ' + error);
    };
}

export default { findAll, findById, add, set, removeById, findByQuestionId, findAndCountByAlternativeId, MostAnsweredAlterantive, findAndCountByQuestionId };