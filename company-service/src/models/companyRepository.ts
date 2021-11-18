import companyModel, {ICompanyModel} from './companyModel';
import {ICompany} from './companies';
import {DestroyOptions} from 'sequelize';

function findAll(){
    return companyModel.findAll<ICompanyModel>();
};

function findByEmail(emailFilter: string){
    return companyModel.findOne<ICompanyModel>({where: {email: emailFilter}});
};

function findById(id: number){
    return companyModel.findByPk<ICompanyModel>(id);
}

function add(company: ICompany){
    return companyModel.create(company);
}

async function set(id: number, company: ICompany){
    const originalCompany = await companyModel.findByPk<ICompanyModel>(id);
    if (originalCompany !== null){
        if(originalCompany.name){
            originalCompany.name = company.name;
        }
        if(originalCompany.status){
            originalCompany.status = company.status;
        }        
        if (company.password){
            originalCompany.password = company.password;
        }
        /*Envia o update para o mysql*/
        await originalCompany.save();
        return originalCompany;
    }
    return null;    
}

function remove (id: number){
    return companyModel.destroy({where: {id: id}} as DestroyOptions<ICompany>);
}

function removeByEmail (email: string){
    return companyModel.destroy({where: {email: email}} as DestroyOptions<ICompany>);
}

export default {findAll, findById, add, set, findByEmail, remove, removeByEmail};