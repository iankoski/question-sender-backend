import { Request, Response } from 'express';
import { ICompany } from '../models/companies';
import repository from '../models/companyRepository';
import auth from '../auth';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

const companies: ICompany[] = [];

async function getCompanies(req: Request, res: Response, next: any) {
    /* retorna um array de companies, utilizando generics <> para deixar
     * explicito que é um findAll de CompanyModel*/
    const companies : ICompany[] = await repository.findAll();
    res.json(companies.map(item => {
        item.password = '';
        return item;
    }));
}

async function getCompany(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if(!id) return res.status(400).end();
        /* Compara o id que será retornada com o que está tentando buscar
         * somente quem pode pegar uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (id !== token.companyId) return res.status(403).end();        
        /* Função para encontrar o indice do vetor
         * a condição é aquele cujo id for = id*/
        const company = await repository.findById(id);
        /*Await -> só executa a próxima linha se tiver a conta*/
        if (company === null) {
            return res.status(404).end();
        } else{
            /*Removendo o password, por segurança*/
            company.password = '';
            res.json(company);
        }
    } catch (error) {
        console.log(error);
        res.status(400).end();
    }

};

async function addCompany(req: Request, res: Response, next: any) {
    try {
        const newCompany = req.body as ICompany;
        /*Sobrescreve o password, fazendo o hash*/       
        newCompany.password = auth.hashPassword(newCompany.password);
        const result = await repository.add(newCompany);
        newCompany.id = result.id;
        newCompany.password = '';        
        res.status(201).json(newCompany);
    } catch {
        console.log(Error);
        res.status(400).end();
    }
}

async function setCompany(req: Request, res: Response, next: any) {
    try{
        const companyId = parseInt(req.params.id);
        /*Testa se o parseInt converteu para de fato um número*/
        if(!companyId) return res.status(400).end();

        /* Compara o id que será atualizado com o que está tentando atualizar
         * somente quem pode atualizar uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (companyId !== token.companyId) return res.status(403).end();        
        
        const companyParams = req.body as ICompany;

        if(companyParams.password){
            companyParams.password = auth.hashPassword(companyParams.password);
        }
        
        const updateCompany = await repository.set(companyId, companyParams);
        if (updateCompany !== null){
            updateCompany.password = '';
            res.status(200).json(updateCompany);
        } else {
            res.status(404).end();
        }

    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

async function loginCompany(req: Request, res: Response, next: any){
       
    try{
        const loginParams = req.body as ICompany;
        const company = await repository.findByEmail(loginParams.email);
        if (company !== null){
            const isValid = auth.comparePassword(loginParams.password, company.password)
            if (isValid){
                const token = await auth.sign(company.id!);
                return res.json({auth: true, token});
            }
        } 
        //Usuário não autorizado
        return res.status(401).end();        
           
        res.json({auth: true, token: {} });
    }catch(error){
        console.log(error);
        res.status(400).end();
    }
}

function logoutCompany(req: Request, res: Response, next: any){
    res.json({auth: false, token: null});
}

async function deleteCompany(req: Request, res: Response, next: any){
    try{        
        const companyId = parseInt(req.params.id);        
        if (!companyId) return res.status(400).end();
        /* Compara o id que será excluído com o que está tentando excluir
         * somente quem pode excluir uma conta é o dono dela  */
        const token = controllerCommons.getToken(res) as Token;
        if (companyId !== token.companyId) return res.status(403).end();

        await repository.remove(companyId);
        res.status(200).end();

    }catch(error){
        console.log(`deleteCompany: ${error}`);
        res.status(400).end();
    }
}

export default { getCompanies, addCompany, getCompany, setCompany, loginCompany, logoutCompany, deleteCompany };