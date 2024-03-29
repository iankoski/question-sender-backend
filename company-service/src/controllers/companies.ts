import { Request, Response } from 'express';
import { ICompany } from '../models/companies';
import repository from '../models/companyRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import { Token } from 'ms-commons/api/auth';
import { CompanyStatus } from '../models/companyStatus';
import auth from '../auth';
import { v4 as uuidv4 } from 'uuid';

async function getCompanies(req: Request, res: Response, next: any) {
    try {
        const includeRemoved = req.query.includeRemoved == 'true';
        const companies: ICompany[] = await repository.findAll(includeRemoved);
        res.json(companies);
    } catch (error) {
        console.log(`getCompanies: ${error}`);
        res.sendStatus(404);
    }
}

async function getCompany(req: Request, res: Response, next: any) {
    try {
        const token = controllerCommons.getToken(res) as Token;
        const id = token.companyId;
        if (!id) return res.status(400).json({ message: 'company id is required' });
        const company = await repository.findById(id);
        if (company === null) return res.sendStatus(404);
        company.password = '';
        console.log(' company ' + company.userName);
        console.log(' companyid ' + company.id);
        res.json(company);
    } catch (error) {
        console.log(`getCompany: ${error}`);
        res.sendStatus(400);
    }
}

async function addCompany(req: Request, res: Response, next: any) {
    try {
        const newCompany = req.body as ICompany;
        newCompany.password = auth.hashPassword(newCompany.password);
        const newQRCode = uuidv4();
        newCompany.urlQrCode = newQRCode;
        const result = await repository.add(newCompany);
        newCompany.password = '';
        newCompany.id = result.id;
        res.status(201).json(newCompany);
    } catch (error) {
        console.log(`addCompany: ${error}`);
        res.status(403).json(error);
    }
}

async function setCompany(req: Request, res: Response, next: any) {
    try {
        const token = controllerCommons.getToken(res) as Token;
        const companyId = token.companyId;
        if (!companyId) return res.status(400).json({ message: 'company id is required' });        
        const company = req.body as ICompany;
        const companyResult = await repository.set(companyId, company);
        if (!companyResult) return res.sendStatus(404);
        res.json(companyResult);

    } catch (error) {
        console.log(`setCompany: ${error}`);
        res.sendStatus(404);
    }
}

async function deleteCompany(req: Request, res: Response, next: any) {
    try {

        const token = controllerCommons.getToken(res) as Token;
        const companyId = token.companyId;
        if (!companyId) return res.status(400).json({ message: 'company id is required' });

        if (req.query.force === 'true') {
            await repository.removeById(companyId);
            res.sendStatus(204);//sucesso sem conteúdo para retornar
        } else {
            const companyParams = {
                status: CompanyStatus.REMOVED
            } as ICompany;
            const updatedCompany = repository.set(companyId, companyParams);
            if (updatedCompany) {
                res.json(updatedCompany);
            }
            res.sendStatus(403);
        }


    } catch (error) {
        console.log(`deleteCompany: ${error}`);
        res.sendStatus(400);
    }
}

async function loginCompany(req: Request, res: Response, next: any) {
    try {
        const loginParams = req.body as ICompany;
        const company = await repository.findByUserName(loginParams.userName);

        if (company !== null) {
            const isValid = auth.comparePassword(loginParams.password, company.password)
                && company.status !== CompanyStatus.REMOVED;

            if (isValid) {
                const token = await auth.sign(company.id!);
                return res.json({ auth: true, token });
            }
            /* Usuário não autorizado */
            else return res.sendStatus(401);
        }
        else return res.sendStatus(404);
    }
    catch (error) {
        console.log(`loginCompany: ${error}`);
        res.sendStatus(400);
    }
}


function logoutCompany(req: Request, res: Response, next: any) {
    res.json({ auth: false, token: null });
}

async function newQRCode(req: Request, res: Response, next: any) {
    try {
        const token = controllerCommons.getToken(res) as Token;
        const companyId = token.companyId;
        if (!companyId) return res.status(400).json({ message: 'company id is required' });
        const newQRCode = uuidv4();
        res.json({ uuid: newQRCode });

    } catch (error) {
        console.log('newQRCode ' + error);
    }
}

async function getCompanyName(req: Request, res: Response, next: any) {
    try {
        const companyId = parseInt(req.params.id);
        if (!companyId) return res.status(400).json({ message: 'company id is required' });
        const company = await repository.findById(companyId);
        if (company === null) return res.sendStatus(404);
        res.json({ companyName: company.name });
    } catch (error) {
        console.log('getCompanyName ' + error);
    }
}

async function getCompanyUid(req: Request, res: Response, next: any) {
    try {
        const companyId = parseInt(req.params.id);
        if (!companyId) return res.status(400).json({ message: 'company id is required' });
        const company = await repository.findById(companyId);
        if (company === null) return res.sendStatus(404);
        res.json({ companyUid: company.urlQrCode });
    } catch (error) {
        console.log(`getCompanyUid ${error}`);
    }
}

export default { getCompanies, addCompany, getCompany, setCompany, deleteCompany, loginCompany, logoutCompany, newQRCode, getCompanyName, getCompanyUid };