import companyModel, {ICompanyModel} from './companyModel';
import {ICompany} from './companies';
import {DestroyOptions, Op} from 'sequelize';
import { CompanyStatus } from './companyStatus';
import auth from '../auth';
function findAll(includeRemoved: boolean){
    if(includeRemoved){
        return companyModel.findAll<ICompanyModel>();
    }
    //Excluindo os com status REMOVED
    return companyModel.findAll<ICompanyModel>({where: {status:{[Op.not]: CompanyStatus.REMOVED}}});
}

function findById(companyId: number){
    return companyModel.findOne<ICompanyModel>({where: {id: companyId}});
}

function add(company: ICompany){
    return companyModel.create(company);
}

async function set(companyId: number, company: ICompany){
    /* Em tese findById funcionaria, porém é recomendado usar findOne passando
     * o id da tabela e também o id da tabela mãe (accountId no caso) */
    const originalCompany = await companyModel.findOne({where: {id: companyId}});
    if (!originalCompany) return null;
    if (company.name) originalCompany.name = company.name;
    if (company.status) originalCompany.status = company.status;
    if (company.urlQrCode) originalCompany.urlQrCode = company.urlQrCode;
    if (company.password) originalCompany.password = auth.hashPassword(company.password);
    const result = await originalCompany.save();
    result.password = '';
    return result;
}

function remove (id: number){
    return companyModel.destroy({where: {id: id}} as DestroyOptions<ICompany>);
}

function findByUserName(userName: string){
    return companyModel.findOne<ICompanyModel>({where: {userName: userName}});
}

function removeByUserName (userName: string){
    return companyModel.destroy({where: {userName: userName}} as DestroyOptions<ICompany>);
}
function removeById(companyId: number){
    return companyModel.destroy({where: {id: companyId}});
}

export default {findAll, findById, add, set, remove, findByUserName, removeByUserName, removeById};