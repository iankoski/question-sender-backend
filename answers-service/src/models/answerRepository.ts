import answerModel, {IAnswerModel} from './answerModel';
import {IAnswer} from './answers';
import {DestroyOptions, Op} from 'sequelize';
import {AnswerStatus} from './answerStatus';

function findAll(companyId: number, includeRemoved: boolean){
    if (includeRemoved)
        return answerModel.findAll<IAnswerModel>({where: {companyId: companyId}});
    //Excluindo os com status REMOVED
    return answerModel.findAll<IAnswerModel>({where: {companyId: companyId, status:{[Op.not]: AnswerStatus.REMOVED}}});
};

function findById(id: number, companyId: number){
    return answerModel.findOne<IAnswerModel>({where: {id: id, companyId: companyId}});
}

function findByQuestionId(questionId: number){
    return answerModel.findAll<IAnswerModel>({where: {companyId: questionId}});
}

function add(answer: IAnswer){
    return answerModel.create(answer);
}

async function set(answerId: number, answer: IAnswer){
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalAnswer = await answerModel.findOne({where: {id: answerId}});
    if (!originalAnswer) return null;

    if (answer.description) originalAnswer.description = answer.description;
    if (answer.status) originalAnswer.status = answer.status;

    const result = await originalAnswer.save();
    answer.id = result.id;
    return answer;
}

async function removeById (id: number){
    return answerModel.destroy({where: {id: id}} as DestroyOptions<IAnswer>);
}

export default {findAll, findById, add, set, removeById, findByQuestionId};