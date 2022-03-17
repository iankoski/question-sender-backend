import { Request, Response } from 'express';
import { ICustomer } from '../models/customers';
import repository from '../models/customerRepository';
import auth from '../auth';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';
import {CustomerStatus} from '../models/customerStatus';

const customers: ICustomer[] = [];

async function getCustomers(req: Request, res: Response, next: any) {
    /* retorna um array de customers, utilizando generics <> para deixar
     * explicito que é um findAll de CustomerModel*/
    try{
        const customers : ICustomer[] = await repository.findAll();
        res.json(customers.map(item => {
            item.password = '';
            return item;
        }));
    }catch(error){
        console.log(`getCustomers: ${error}`);
        res.sendStatus(400);
    }
}

async function getCustomer(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if(!id) return res.status(400).end();
        /* Compara o id que será retornada com o que está tentando buscar
         * somente quem pode pegar uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (id !== token.customerId) return res.status(403).end();        
        /* Função para encontrar o indice do vetor
         * a condição é aquele cujo id for = id*/
        const customer = await repository.findById(id);
        /*Await -> só executa a próxima linha se tiver a conta*/
        if (customer === null) {
            return res.status(404).end();
        } else{
            /*Removendo o password, por segurança*/
            customer.password = '';
            res.json(customer);
        }
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }

};

async function addCustomer(req: Request, res: Response, next: any) {
    try {
        const newCustomer = req.body as ICustomer;
        /*Sobrescreve o password, fazendo o hash*/       
        newCustomer.password = auth.hashPassword(newCustomer.password);
        const result = await repository.add(newCustomer);
        newCustomer.id = result.id;
        newCustomer.password = '';        
        res.status(201).json(newCustomer);
    } catch {
        console.log(Error);
        res.status(400).end();
    }
}

async function setCustomer(req: Request, res: Response, next: any) {
    try{
        const customerId = parseInt(req.params.id);
        /*Testa se o parseInt converteu para de fato um número*/
        if(!customerId) return res.status(400).end();

        /* Compara o id que será atualizado com o que está tentando atualizar
         * somente quem pode atualizar uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (customerId !== token.customerId) return res.status(403).end();        
        
        const customerParams = req.body as ICustomer;

        if(customerParams.password){
            customerParams.password = auth.hashPassword(customerParams.password);
        }
        
        const updateCustomer = await repository.set(customerId, customerParams);
        if (updateCustomer !== null){
            updateCustomer.password = '';
            res.status(200).json(updateCustomer);
        } else {
            res.status(404).end();
        }

    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function loginCustomer(req: Request, res: Response, next: any) {
    try {
        const loginParams = req.body as ICustomer;
        const customer = await repository.findByEmail(loginParams.email);

        if (customer !== null) {
            const isValid = auth.comparePassword(loginParams.password, customer.password)
                && customer.status !== CustomerStatus.REMOVED;

            if (isValid) {
                const token = await auth.sign(customer.id!);
                return res.json({ auth: true, token });
            }
            /* Usuário não autorizado */
            else return res.sendStatus(401);
        }
        else return res.sendStatus(404);
    }
    catch (error) {
        console.log(`loginCustomer: ${error}`);
        res.sendStatus(400);
    }
}

function logoutCustomer(req: Request, res: Response, next: any){
    res.json({auth: false, token: null});
}

async function deleteCustomer(req: Request, res: Response, next: any){
    try{        
        const customerId = parseInt(req.params.id);        
        if (!customerId) return res.status(400).end();
        /* Compara o id que será excluído com o que está tentando excluir
         * somente quem pode excluir uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (customerId !== token.customerId) return res.status(403).end();

        await repository.remove(customerId);
        res.status(200).end();

    }catch(error){
        console.log(`deleteCustomer: ${error}`);
        res.status(400).end();
    }
}

export default { getCustomers, addCustomer, getCustomer, setCustomer, loginCustomer, logoutCustomer, deleteCustomer };