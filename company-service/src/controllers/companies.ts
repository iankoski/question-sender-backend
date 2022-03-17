import { Request, Response } from 'express';
import { ICompany } from '../models/companies';
import repository from '../models/companyRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';
import { CompanyStatus } from '../models/companyStatus';

const companies: ICompany[] = [];

async function getCompanies(req: Request, res: Response, next: any){
    try{
        const includeRemoved = req.query.includeRemoved == 'true';
        const token = controllerCommons.getToken(res) as Token;
        console.log('debug: '+token+ ' id: '+token.customerId);
        const companies: ICompany[] = await repository.findAll(token.customerId, includeRemoved);
        res.json(companies);
    }catch(error){
        console.log(`getCompanies: ${error}`);
        res.sendStatus(404);
    }
}

async function getCompany(req: Request, res: Response, next: any) {
    try {
        const id = parseInt(req.params.id);
        if (!id) return res.status(400).json({ message: 'company id is required' });

        let customerId = parseInt(req.params.customerId);
        if (!customerId) {
            const token = controllerCommons.getToken(res) as Token;
            customerId = token.customerId;
        }

        const company = await repository.findById(id, customerId);
        if (company === null) return res.sendStatus(404);
        else res.json(company);
    } catch (error) {
        console.log(`getCompany: ${error}`);
        res.sendStatus(400);
    }
}

async function addCompany(req: Request, res: Response, next: any) {
    try {
        const newCompany = req.body as ICompany;    
        const result = await repository.add(newCompany);
        newCompany.id = result.id;      
        res.status(201).json(newCompany);
    } catch (error){
        console.log(`addCompany: ${error}`);
        res.sendStatus(400);
    }
}

async function setCompany(req: Request, res: Response, next: any){
    try{
        const companyId = parseInt(req.params.id);
        if (!companyId) res.status(400).json({message: 'id is required'});     

        const token = controllerCommons.getToken(res) as Token;
        const company = req.body as ICompany;
        const result = await repository.set(companyId, company, token.customerId);
        if (!result) return res.sendStatus(404);
        
        res.json(result);

    }catch(error){
        console.log(`setCompany: ${error}`);
        res.sendStatus(404);     
    }
}

async function deleteCompany(req: Request, res: Response, next: any){
    try{
        
        const companyId = parseInt(req.params.id);
        
        if (!companyId) return res.status(400).json({message: 'id is required'});

        const token = controllerCommons.getToken(res) as Token;

        if (req.query.force === 'true'){
            await repository.removeById(companyId, token.customerId);
            res.sendStatus(204);//sucesso sem conteúdo para retornar
        } else {
            const companyParams = {
                status: CompanyStatus.REMOVED
            } as ICompany;
            const updatedCompany = repository.set(companyId, companyParams, token.customerId);
            if (updatedCompany) {
                res.json(updatedCompany);
            }
            res.sendStatus(403);
        }       
        

    }catch(error){
        console.log(`deleteCompany: ${error}`);
        res.sendStatus(400);
    }
}

export default { getCompanies, addCompany, getCompany, setCompany, deleteCompany };