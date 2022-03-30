import alternativeModel, { IAlternativeModel } from './alternativeModel';
import { IAlternative } from './alternatives';
import { DestroyOptions, Op } from 'sequelize';
import { AlternativeStatus } from './alternativeStatus';

function findAll(companyId: number, includeRemoved: boolean) {
    if (includeRemoved)
        return alternativeModel.findAll<IAlternativeModel>({ where: { companyId: companyId } });
    //Excluindo os com status REMOVED
    return alternativeModel.findAll<IAlternativeModel>(
        {
            where: {
                companyId: companyId,
                status: { [Op.not]: AlternativeStatus.REMOVED }
            }
        });
};

function findByQuestion(companyId: number, includeRemoved: boolean, questionId: number) {
    if (includeRemoved)
        return alternativeModel.findAll<IAlternativeModel>({ where: { companyId: companyId, questionId: questionId } });
    //Excluindo os com status REMOVED
    return alternativeModel.findAll<IAlternativeModel>(
        {
            where: {
                companyId: companyId,
                questionId: questionId,
                status: { [Op.not]: AlternativeStatus.REMOVED },
            },
            order: ['id']
        });
};

function findById(id: number, companyId: number) {
    return alternativeModel.findOne<IAlternativeModel>({ where: { id: id, companyId: companyId } });
}

function findByCompanyId(companyId: number) {
    return alternativeModel.findAll<IAlternativeModel>({ where: { companyId: companyId } });
}

function add(alternative: IAlternative) {
    return alternativeModel.create(alternative);
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

export default { findAll, findById, add, set, removeById, findByCompanyId, findByQuestion };