import newModel, { INewModel } from './newModel';
import { INew } from './news';
import { DestroyOptions, Op, QueryTypes } from 'sequelize';
import { NewStatus } from './newStatus';
import sequelize from 'ms-commons/data/db';

function findAll(companyId: number) {
    //Excluindo os com status REMOVED
    return newModel.findAll<INewModel>({ where: { companyId: companyId, status: { [Op.not]: NewStatus.REMOVED } } });
};

function findById(id: number) {
    return newModel.findOne<INewModel>({ where: { id: id } });
}

function findByCompanyId(companyId: number) {
    return newModel.findAll<INewModel>({ where: { companyId: companyId } });
}

function add(news: INew) {
    return newModel.create(news);
}

async function set(newId: number, news: INew) {
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalNew = await newModel.findOne({ where: { id: newId } });
    if (!originalNew) return null;

    if (news.description) originalNew.description = news.description;
    if (news.startDate) originalNew.startDate = news.startDate;
    if (news.endDate) originalNew.endDate = news.endDate;
    if (news.status) originalNew.status = news.status;
    if (news.title) originalNew.title = news.title;

    const result = await originalNew.save();
    news.id = result.id;
    return news;
}

async function removeById(id: number) {
    return newModel.destroy({ where: { id: id } } as DestroyOptions<INew>);
}

async function findByBetweenDate(companyId: number) {

    const result = await sequelize.query(`select * 
                                              from news
                                             where news.endDate >= current_date() 
                                               and news.startDate <= current_date()
                                               and news.status not in (${NewStatus.REMOVED})
                                               and news.companyId = ${companyId};`,
        { type: QueryTypes.SELECT });
    
    return result;

}

export default { findAll, findById, add, set, removeById, findByCompanyId, findByBetweenDate };