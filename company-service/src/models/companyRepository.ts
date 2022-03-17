import companyModel, {ICompanyModel} from './companyModel';
import {ICompany} from './companies';
import {DestroyOptions, Op} from 'sequelize';
import { CompanyStatus } from './companyStatus';

function findAll(customerId: number, includeRemoved: boolean){
    if(includeRemoved){
        return companyModel.findAll<ICompanyModel>({where: {customerId: customerId}});
    }
    //Excluindo os com status REMOVED
    return companyModel.findAll<ICompanyModel>({where: {customerId: customerId, status:{[Op.not]: CompanyStatus.REMOVED}}});
}

function findById(companyId: number, customerId: number){
    return companyModel.findOne<ICompanyModel>({where: {id: companyId, customerId: customerId}});
}

function add(company: ICompany){
    return companyModel.create(company);
}

async function set(companyId: number, company: ICompany, customerId: number){
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalCompany = await companyModel.findOne({where: {id: companyId, customerId: customerId}});
    if (!originalCompany) return null;

    if (company.name) originalCompany.name = company.name;
    if (company.status) originalCompany.status = company.status;

    const result = await originalCompany.save();
    company.id = result.id;
    return company;
}

function remove (id: number){
    return companyModel.destroy({where: {id: id}} as DestroyOptions<ICompany>);
}

function removeByEmail (email: string){
    return companyModel.destroy({where: {email: email}} as DestroyOptions<ICompany>);
}
function removeById(companyId: number, customerId: number){
    return companyModel.destroy({where: {id: companyId, customerId: customerId}});
}

export default {findAll, findById, add, set, remove, removeByEmail, removeById};