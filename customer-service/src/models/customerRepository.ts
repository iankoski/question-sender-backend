import customerModel, {ICustomerModel} from './customerModel';
import {ICustomer} from './customers';
import {DestroyOptions} from 'sequelize';

function findAll(){
    return customerModel.findAll<ICustomerModel>();
};

function findByEmail(emailFilter: string){
    return customerModel.findOne<ICustomerModel>({where: {email: emailFilter}});
};

function findById(id: number){
    return customerModel.findByPk<ICustomerModel>(id);
}

function add(customer: ICustomer){
    return customerModel.create(customer);
}

async function set(id: number, customer: ICustomer){
    const originalCustomer = await customerModel.findByPk<ICustomerModel>(id);
    if (originalCustomer !== null){
        if(customer.name){
            originalCustomer.name = customer.name;
        }
        if(customer.status){
            originalCustomer.status = customer.status;
        }        
        if (customer.password){
            originalCustomer.password = customer.password;
        }
        if (customer.phone){
            originalCustomer.phone = customer.phone;
        }        
        /*Envia o update para o mysql*/
        await originalCustomer.save();
        return originalCustomer;
    }
    return null;    
}

function remove (id: number){
    return customerModel.destroy({where: {id: id}} as DestroyOptions<ICustomer>);
}

function removeByEmail (email: string){
    return customerModel.destroy({where: {email: email}} as DestroyOptions<ICustomer>);
}

export default {findAll, findById, add, set, findByEmail, remove, removeByEmail};