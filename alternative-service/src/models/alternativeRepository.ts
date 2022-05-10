import alternativeModel, { IAlternativeModel } from './alternativeModel';
import { IAlternative } from './alternatives';
import { DestroyOptions, Op } from 'sequelize';
import { AlternativeStatus } from './alternativeStatus';


function findByQuestion(includeRemoved: boolean, questionId: number) {
    if (includeRemoved)
        return alternativeModel.findAll<IAlternativeModel>({ where: {questionId: questionId } });
    //Excluindo os com status REMOVED
    return alternativeModel.findAll<IAlternativeModel>(
        {
            where: {
                questionId: questionId,
                status: { [Op.not]: AlternativeStatus.REMOVED },
            },
            order: ['id']
        });
};

function findById(id: number) {
    return alternativeModel.findOne<IAlternativeModel>({ where: { id: id} });
}

function add(alternativesList: IAlternative[]) {
    return alternativeModel.bulkCreate(alternativesList);   
}

function removeByQuestionId(questionId: number){
    return alternativeModel.destroy({where: {questionId: questionId}});
}

async function set(alternativeId: number, alternative: IAlternative) {
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalAlternative = await alternativeModel.findOne({ where: { id: alternativeId } });
    if (!originalAlternative) return null;

    if (alternative.description) originalAlternative.description = alternative.description;
    if (alternative.status) originalAlternative.status = alternative.status;

    const result = await originalAlternative.save();
    alternative.id = result.id;
    return alternative;
}

async function removeById(id: number) {
    return alternativeModel.destroy({ where: { id: id } } as DestroyOptions<IAlternative>);
}

export default {  findById, add, set, removeById, findByQuestion, removeByQuestionId };