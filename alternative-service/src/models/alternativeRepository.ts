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
    var newAlternatives: IAlternative[];
    return alternativeModel.bulkCreate(alternativesList);/**
    alternativesList.map(a => {
        let alternative = {description: a.description, questionId: a.questionId} as IAlternative;
        console.log('teste add alternative: '+alternative);
        //newAlternatives.push(alternativeModel.create(alternative));
    });*/
   
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

export default {  findById, add, set, removeById, findByQuestion };